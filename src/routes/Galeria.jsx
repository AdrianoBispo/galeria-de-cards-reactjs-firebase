import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { EditAlbumModal } from "../components/EditAlbumModal";
import { ManageCardsModal } from './../components/ManageCards';

import { CogIcon, TrashIcon, PencilIcon } from "../assets/Icones";
import { cardData } from "../mocks/cardData";
import { MiniCard } from "./../components/MiniCard";

// Mapeia IDs para dados completos para fácil acesso
const cardMap = new Map(cardData.map((card) => [card.id, card]));

export function Galeria() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAlbum, setEditingAlbum] = useState(null); // Para EditAlbumModal
  const [managingCardsAlbum, setManagingCardsAlbum] = useState(null); // Para ManageCardsModal

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchAlbums(currentUser.uid);
      } else {
        setUser(null);
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchAlbums = async (uid) => {
    setLoading(true);
    try {
      const albumsCollectionRef = collection(db, "users", uid, "albums");
      const querySnapshot = await getDocs(albumsCollectionRef);
      const fetchedAlbums = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      fetchedAlbums.sort((a, b) => {
        if (a.id === "favorites") return -1;
        if (b.id === "favorites") return 1;
        return (a.createdAt?.toDate() || 0) - (b.createdAt?.toDate() || 0);
      });
      setAlbums(fetchedAlbums);
    } catch (error) {
      console.error("Erro ao buscar álbuns:", error);
    }
    setLoading(false);
  };

  const handleDeleteAlbum = async (albumId) => {
    if (!user || albumId === "favorites") return;
    if (
      window.confirm(
        "Tem certeza que deseja deletar este álbum? Esta ação não pode ser desfeita."
      )
    ) {
      try {
        const albumDocRef = doc(db, "users", user.uid, "albums", albumId);
        await deleteDoc(albumDocRef);
        setAlbums((prev) => prev.filter((album) => album.id !== albumId));
      } catch (error) {
        console.error("Erro ao deletar álbum:", error);
      }
    }
  };

  const handleSaveAlbumDetails = async (albumId, title, description) => {
    if (!user) return;
    try {
      const albumDocRef = doc(db, "users", user.uid, "albums", albumId);
      await updateDoc(albumDocRef, { title, description });
      setAlbums((prev) =>
        prev.map((album) =>
          album.id === albumId ? { ...album, title, description } : album
        )
      );
    } catch (error) {
      console.error("Erro ao salvar detalhes do álbum:", error);
    }
  };

  const handleSaveChangesCards = async (albumId, newCardIds) => {
    if (!user) return;
    try {
      const albumDocRef = doc(db, "users", user.uid, "albums", albumId);
      await updateDoc(albumDocRef, { cards: newCardIds });
      setAlbums((prev) =>
        prev.map((album) =>
          album.id === albumId ? { ...album, cards: newCardIds } : album
        )
      );
    } catch (error) {
      console.error("Erro ao salvar cards do álbum:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h2">Minha Galeria</Typography>
        <div>
          <Button onClick={() => navigate("/cards")} className="mr-4">
            Ver Cards
          </Button>
          <Button color="red" onClick={() => auth.signOut()}>
            Sair
          </Button>
        </div>
      </div>

      {loading ? (
        <Typography>Carregando álbuns...</Typography>
      ) : albums.length === 0 ? (
        <Typography>
          Você ainda não criou nenhum álbum ou favoritou cards.
        </Typography>
      ) : (
        albums.map((album) => (
          <div
            key={album.id}
            className="mb-10 p-6 border rounded-lg shadow-lg bg-white"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="prose">
                {" "}
                {/* Classe para estilizar o Markdown */}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {album.title || "Álbum Sem Título"}
                </ReactMarkdown>
              </div>
              <div className="flex gap-2">
                <Tooltip content="Gerenciar Cards">
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={() => setManagingCardsAlbum(album)}
                  >
                    <CogIcon />
                  </IconButton>
                </Tooltip>
                {album.id !== "favorites" && (
                  <>
                    <Tooltip content="Editar Álbum">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => setEditingAlbum(album)}
                      >
                        <PencilIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Deletar Álbum">
                      <IconButton
                        variant="text"
                        color="red"
                        onClick={() => handleDeleteAlbum(album.id)}
                      >
                        <TrashIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
            <div className="prose prose-sm text-gray-600 mb-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {album.description || ""}
              </ReactMarkdown>
            </div>

            {!album.cards || album.cards.length === 0 ? (
              <Typography>Este álbum está vazio.</Typography>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {album.cards.map((cardId) => (
                  <MiniCard key={cardId} card={cardMap.get(cardId)} />
                ))}
              </div>
            )}
          </div>
        ))
      )}
      {/* Modais */}
      {editingAlbum && (
        <EditAlbumModal
          album={editingAlbum}
          open={!!editingAlbum}
          onClose={() => setEditingAlbum(null)}
          onSave={handleSaveAlbumDetails}
        />
      )}
      {managingCardsAlbum && (
        <ManageCardsModal
          album={managingCardsAlbum}
          allCardsMap={cardMap}
          open={!!managingCardsAlbum}
          onClose={() => setManagingCardsAlbum(null)}
          onSave={handleSaveChangesCards}
        />
      )}
    </div>
  );
}
