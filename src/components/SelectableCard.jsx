import { Typography, Checkbox } from "@material-tailwind/react";

// Componente para um card selecionável (Passo 2)
export function SelectableCard({ card, onSelect, isSelected }) {
  return (
    <div
      key={card.id}
      className="cursor-pointer border-2 p-1 rounded-lg shadow-sm bg-white"
      style={{ borderColor: isSelected ? "blue" : "transparent" }}
      onClick={(e) => {
        console.log(`Clicou no Selectable - ID: ${card.id}`);
        e.preventDefault();
        e.stopPropagation();
        onSelect(card);
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    >
      <img
        src={card.imageUrl}
        alt={card.title}
        className="h-32 w-full object-cover rounded-t-md"
      />
      <div className="p-2 text-center relative">
        <Typography variant="small" className="font-bold truncate">
          {card.title}
        </Typography>
        <Checkbox
          checked={isSelected}
          readOnly
          className="absolute top-1 right-1 pointer-events-none" // Evita que o checkbox capture eventos
        />
      </div>
    </div>
  );
}
