// Dados mockados para os 12 cards
export const cardData = Array.from({ length: 12 }, (_, i) => ({
  id: `card_${i + 1}`,
  title: `Card Título ${i + 1}`,
  description: `Descrição breve e interessante para o card número ${i + 1}.`,
  imageUrl:
    "https://gru.ifsp.edu.br/images/phocagallery/galeria2/image03_grd.png", // Imagens aleatórias
  price: (Math.random() * 100 + 50).toFixed(0),
  rating: (Math.random() * 2 + 3).toFixed(1),
}));
