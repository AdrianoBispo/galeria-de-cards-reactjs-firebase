import { Card, CardBody,CardHeader, IconButton, Typography } from "@material-tailwind/react";

export function MiniCard({ card, onRemove, albumId }) {
  if (!card) return null; // Retorna nulo se o card não for encontrado
  return (
    <Card className="w-full max-w-[15rem] shadow-md mb-4">
      <CardHeader floated={false} color="blue-gray" className="h-40">
        <img
          src={card.imageUrl}
          alt={card.title}
          className="w-full h-full object-cover"
        />
        {onRemove &&
          albumId !== "favorites" && ( // Só mostra o X se for um album customizado
            <IconButton
              size="sm"
              color="red"
              variant="filled"
              className="!absolute top-2 right-2 rounded-full"
              onClick={() => onRemove(albumId, card.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          )}
      </CardHeader>
      <CardBody className="text-center p-4">
        <Typography variant="h6" color="blue-gray" className="font-medium">
          {card.title}
        </Typography>
      </CardBody>
    </Card>
  );
}
