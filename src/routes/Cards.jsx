import { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  addDoc,
} from "firebase/firestore";
import { CardModal } from "../components/CardModal";

import { cardData } from "../mocks/cardData";
import { BookingCard } from "../components/BookingCard";

export function Cards() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchFavorites(currentUser.uid);
      } else {
        setUser(null);
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchFavorites = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid, "albums", "favorites");
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setFavorites(docSnap.data().cards || []);
      } else {
        // Se o album de favoritos não existe, cria ele
        await setDoc(userDocRef, {
          title: "Favoritos",
          description: "Meus cards favoritos",
          cards: [],
          createdAt: new Date(),
        });
        setFavorites([]);
      }
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
    }
  };

  const handleFavorite = async (cardId, isAdding) => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid, "albums", "favorites");
    try {
      await updateDoc(userDocRef, {
        cards: isAdding ? arrayUnion(cardId) : arrayRemove(cardId),
      });
      setFavorites((prev) =>
        isAdding ? [...prev, cardId] : prev.filter((id) => id !== cardId)
      );
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
      // Tenta criar o doc se não existir (pouco provável com o fetchFavorites)
      if (error.code === "not-found") {
        await setDoc(userDocRef, { cards: [cardId] });
        setFavorites([cardId]);
      }
    }
  };

  const handleAddToGallery = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateAlbum = async (selectedCards, title, description) => {
    if (!user) return;
    try {
      const albumsCollectionRef = collection(db, "users", user.uid, "albums");
      await addDoc(albumsCollectionRef, {
        title: title,
        description: description,
        cards: selectedCards.map((card) => card.id), // Salva apenas os IDs
        createdAt: new Date(),
      });
      console.log("Album criado com sucesso!");
      setShowModal(false);
      navigate("/galeria"); // Opcional: navegar para a galeria após criar
    } catch (error) {
      console.error("Erro ao criar album:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h2">Cards Seção</Typography>
        <div>
          <Button onClick={() => navigate("/galeria")} className="mr-4">
            Minha Galeria
          </Button>
          <Button color="red" onClick={() => auth.signOut()}>
            Sair
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <BookingCard
            key={card.id}
            card={card}
            onFavorite={handleFavorite}
            isFavorited={favorites.includes(card.id)}
            onAddToGallery={handleAddToGallery}
          />
        ))}
      </div>
      {showModal && (
        <CardModal
          availableCards={cardData}
          onClose={handleCloseModal}
          onSubmit={handleCreateAlbum}
        />
      )}
    </div>
  );
}
