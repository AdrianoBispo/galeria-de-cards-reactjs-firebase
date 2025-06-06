import {
  Card,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Componente para um card 'arrastável' (Passo 1)
export function SortableCard({ id, card, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full max-w-[10rem] shadow-md mb-4 relative cursor-grab active:cursor-grabbing"
    >
      <img
        src={card.imageUrl}
        alt={card.title}
        className="h-24 w-full object-cover"
      />
      <CardBody className="p-2 text-center">
        <Typography variant="small" className="font-medium truncate">
          {card.title}
        </Typography>
      </CardBody>
      <IconButton
        size="sm"
        color="red"
        variant="filled"
        className="!absolute top-1 right-1 rounded-full z-10 w-5 h-5"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-3 h-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </IconButton>
    </Card>
  );
}
