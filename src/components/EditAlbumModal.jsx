import { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogHeader, DialogBody, DialogFooter,
  Input, Textarea, Typography
} from "@material-tailwind/react";

export function EditAlbumModal({ album, open, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (album) {
      setTitle(album.title || '');
      setDescription(album.description || '');
    }
  }, [album]);

  const handleSave = () => {
    if (title.trim()) {
      onSave(album.id, title, description);
      onClose();
    }
  };

  if (!album) return null;

  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>Editar Álbum</DialogHeader>
      <DialogBody divider>
        <div className="flex flex-col gap-6">
          <Input
            label="Título do Álbum (Markdown)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            label="Descrição (Markdown, máx. 250 caracteres)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={250}
          />
           <Typography variant="small" color="gray">
              Use a sintaxe Markdown para formatar o título e a descrição.
            </Typography>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose} className="mr-1">
          <span>Cancelar</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={handleSave}
          disabled={title.trim() === ''}
        >
          <span>Salvar Alterações</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
