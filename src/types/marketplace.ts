export type PartnerCategory = "vet" | "care" | "walk" | "grooming" | "hotel" | "products";

export interface Partner {
  id: number;
  name: string;
  category: PartnerCategory;
  categoryLabel: string;
  description: string;
  rating: string;
  reviews: string;
  distance: string;
  price: string;
  avatarEmoji: string;
  avatarColor: string;
}

export const CATEGORY_LABELS: Record<PartnerCategory | "all", string> = {
  all:      "Todos",
  vet:      "Veterinários",
  care:     "Cuidadores",
  walk:     "Passeadores",
  grooming: "Banho e Tosa",
  hotel:    "Hospedagem",
  products: "Produtos",
};

export const PARTNERS: Partner[] = [
  { id: 0, name: "Clínica VetCare",  category: "vet",      categoryLabel: "Veterinários", description: "Consultas, exames e cirurgias. Especializada em cães e gatos",    rating: "4.9", reviews: "128", distance: "1,2 km",  price: "R$ 80",         avatarEmoji: "🏥", avatarColor: "#f59e0b" },
  { id: 1, name: "Pet Spa Premium",  category: "grooming", categoryLabel: "Banho e Tosa",  description: "Banho, escovação, produtos orgânicos, regularmente",               rating: "4.6", reviews: "89",  distance: "2,1 km",  price: "R$ 45",         avatarEmoji: "💅", avatarColor: "#ec4899" },
  { id: 2, name: "MakePets",         category: "care",     categoryLabel: "Cuidadores",    description: "Cuidador profissional em grupo, PetPulse certificado",             rating: "4.7", reviews: "34",  distance: "0,8 km",  price: "R$ 35/dia",     avatarEmoji: "👤", avatarColor: "#3b82f6" },
  { id: 3, name: "PetMazur Feliz",   category: "hotel",    categoryLabel: "Hospedagem",    description: "Serviços individuais com acompanhamento permanente",               rating: "4.8", reviews: "56",  distance: "3,4 km",  price: "R$ 80/dia",     avatarEmoji: "🏨", avatarColor: "#8b5cf6" },
  { id: 4, name: "Loja PetLife",     category: "products", categoryLabel: "Produtos",      description: "Ração, petiscos, acessórios e brinquedos para pets",              rating: "4.5", reviews: "201", distance: "1,7 km",  price: "Variado",       avatarEmoji: "🛍️", avatarColor: "#f97316" },
  { id: 5, name: "Dr. Pet Online",   category: "vet",      categoryLabel: "Veterinários",  description: "Teleconsulta veterinária digital, sem sair de casa",               rating: "4.8", reviews: "312", distance: "Online",  price: "R$ 60",         avatarEmoji: "📱", avatarColor: "#06b6d4" },
  { id: 6, name: "Grooming & Cia",   category: "grooming", categoryLabel: "Banho e Tosa",  description: "Tosa artística, banho medicinal, aromaterapia pet",               rating: "4.7", reviews: "67",  distance: "2,8 km",  price: "R$ 55",         avatarEmoji: "✂️", avatarColor: "#a855f7" },
  { id: 7, name: "Passeador João",   category: "walk",     categoryLabel: "Passeadores",   description: "Passeios diários individuais e em grupo no parque",               rating: "4.9", reviews: "145", distance: "0,5 km",  price: "R$ 25/passeio", avatarEmoji: "🚶", avatarColor: "#10b981" },
];
