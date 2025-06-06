import { useState } from 'react';
import {
  Button, Dialog, DialogHeader, DialogBody, DialogFooter,
  Input, Checkbox, Card, CardBody, Typography
} from "@material-tailwind/react";

export function AddCardsModal({ availableCards, cardsToExclude, open, onClose, onAdd }) {
  const [selectedCards, setSelectedCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCardSelect = (card) => {
    setSelectedCards(prev =>
      prev.some(c => c.id === card.id)
        ? prev.filter(c => c.id !== card.id)
        : [...prev, card]
    );
  };

  // Filtra cards já existentes e pelo termo de busca
  const cardsToShow = availableCards
      .filter(card => !cardsToExclude.includes(card.id))
      .filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleConfirmAdd = () => {
    if (selectedCards.length > 0) {
      onAdd(selectedCards);
    }
  };

  return (
    <Dialog open={open} handler={onClose} size="lg">
      <DialogHeader>Adicionar Cards ao Álbum</DialogHeader>
      <DialogBody divider className="h-[40rem] overflow-scroll">
        <div className="mb-4">
          <Input
            label="Buscar Card pelo Título"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<i className="fas fa-search" />}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {cardsToShow.length > 0 ? (
              cardsToShow.map(card => (
                <Card key={card.id} className="cursor-pointer border-2"
                      style={{borderColor: selectedCards.some(c => c.id === card.id) ? 'blue' : 'transparent'}}
                      onClick={() => handleCardSelect(card)}>
                  <img src={card.imageUrl} alt={card.title} className="h-32 w-full object-cover"/>
                  <CardBody className="p-2 text-center">
                    <Typography variant="small" className="font-bold">{card.title}</Typography>
                    <Checkbox
                        checked={selectedCards.some(c => c.id === card.id)}
                        readOnly
                        className="absolute top-1 right-1"
                    />
                  </CardBody>
                </Card>
              ))
          ) : (
            <Typography>Nenhum card novo disponível para adicionar.</Typography>
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose} className="mr-1">
          <span>Cancelar</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={handleConfirmAdd}
          disabled={selectedCards.length === 0}
        >
          <span>Adicionar Selecionados</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
