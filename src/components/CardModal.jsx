import { useState } from 'react';
import {
  Button, Dialog, DialogHeader, DialogBody, DialogFooter,
  Input, Checkbox, Card, CardBody, Typography, Textarea
} from "@material-tailwind/react";

export function CardModal({ availableCards, onClose, onSubmit }) {
  const [step, setStep] = useState(1); // 1: Seleção, 2: Formulário
  const [selectedCards, setSelectedCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumDescription, setAlbumDescription] = useState('');

  const handleCardSelect = (card) => {
    setSelectedCards(prev =>
      prev.some(c => c.id === card.id)
        ? prev.filter(c => c.id !== card.id)
        : [...prev, card]
    );
  };

  const filteredCards = availableCards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNextStep = () => {
    if (selectedCards.length > 0) {
      setStep(2);
    }
  };

  const handleSubmitForm = () => {
      if (albumTitle.trim() !== '') {
         onSubmit(selectedCards, albumTitle, albumDescription);
      }
  };

  return (
    <Dialog open={true} handler={onClose} size="lg">
      {step === 1 && (
        <>
          <DialogHeader>Selecione os Cards para o Novo Álbum</DialogHeader>
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
              {filteredCards.map(card => (
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
              ))}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={onClose} className="mr-1">
              <span>Cancelar</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={handleNextStep}
              disabled={selectedCards.length === 0}
            >
              <span>Próximo</span>
            </Button>
          </DialogFooter>
        </>
      )}

      {step === 2 && (
          <>
            <DialogHeader>Criar Novo Álbum</DialogHeader>
            <DialogBody divider>
                <Typography className="mb-4">
                   Você selecionou {selectedCards.length} card(s).
                </Typography>
                <div className="flex flex-col gap-6">
                    <Input
                        label="Título do Álbum"
                        value={albumTitle}
                        onChange={(e) => setAlbumTitle(e.target.value)}
                        required
                    />
                    <Textarea
                        label="Descrição (opcional, máx. 250 caracteres)"
                        value={albumDescription}
                        onChange={(e) => setAlbumDescription(e.target.value)}
                        maxLength={250}
                    />
                </div>
            </DialogBody>
            <DialogFooter>
                 <Button variant="text" color="gray" onClick={() => setStep(1)} className="mr-1">
                    <span>Voltar</span>
                 </Button>
                 <Button variant="text" color="red" onClick={onClose} className="mr-1">
                    <span>Cancelar</span>
                 </Button>
                 <Button
                    variant="gradient"
                    color="green"
                    onClick={handleSubmitForm}
                    disabled={albumTitle.trim() === ''}
                 >
                    <span>Confirmar e Criar</span>
                 </Button>
            </DialogFooter>
          </>
      )}
    </Dialog>
  );
}
