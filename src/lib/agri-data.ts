export type Product = {
  id: string;
  name: string;
  category: string;
  quantity: string;
  price: string;
  district: string;
  grade: string;
  seller: string;
  verified: boolean;
  emoji: string;
};

export const products: Product[] = [
  { id: "p1", name: "Irish Potatoes (Kinigi)", category: "Vegetables", quantity: "2,400 kg", price: "RWF 420 / kg", district: "Musanze", grade: "Grade A", seller: "Uwimana Claudine", verified: true, emoji: "🥔" },
  { id: "p2", name: "Yellow Maize, dried", category: "Cereals", quantity: "8 tonnes", price: "RWF 510 / kg", district: "Nyagatare", grade: "Grade A", seller: "Koperative Umucyo", verified: true, emoji: "🌽" },
  { id: "p3", name: "Climbing Beans", category: "Legumes", quantity: "1,200 kg", price: "RWF 890 / kg", district: "Burera", grade: "Grade B", seller: "Habimana Eric", verified: true, emoji: "🫘" },
  { id: "p4", name: "Fresh Tomatoes", category: "Vegetables", quantity: "600 kg", price: "RWF 700 / kg", district: "Bugesera", grade: "Grade A", seller: "Mukamana Alice", verified: false, emoji: "🍅" },
  { id: "p5", name: "Arabica Coffee Parchment", category: "Cash crops", quantity: "3 tonnes", price: "RWF 3,100 / kg", district: "Huye", grade: "Fully washed", seller: "Abahuzamugambi Coop", verified: true, emoji: "☕" },
  { id: "p6", name: "Fresh Cow Milk", category: "Livestock", quantity: "400 L / day", price: "RWF 450 / L", district: "Gicumbi", grade: "Grade A", seller: "Ndayisaba Jean", verified: true, emoji: "🥛" },
  { id: "p7", name: "Table Eggs", category: "Poultry", quantity: "9,000 pcs", price: "RWF 130 / pc", district: "Kicukiro", grade: "Medium", seller: "Rugero Poultry Farm", verified: true, emoji: "🥚" },
  { id: "p8", name: "Pure Honey", category: "Processed", quantity: "350 kg", price: "RWF 6,500 / kg", district: "Nyamagabe", grade: "Raw", seller: "Nyungwe Beekeepers", verified: false, emoji: "🍯" },
  { id: "p9", name: "Sweet Bananas", category: "Fruits", quantity: "5 tonnes", price: "RWF 380 / kg", district: "Rusizi", grade: "Grade B", seller: "Bizimana Patrick", verified: true, emoji: "🍌" },
];

export type PriceRow = {
  product: string;
  market: string;
  district: string;
  wholesale: number;
  retail: number;
  trend: "up" | "down" | "stable";
  change: string;
};

export const marketPrices: PriceRow[] = [
  { product: "Irish potatoes", market: "Kimironko", district: "Gasabo", wholesale: 400, retail: 520, trend: "up", change: "+4.2%" },
  { product: "Maize grain", market: "Nyabugogo", district: "Nyarugenge", wholesale: 490, retail: 610, trend: "up", change: "+1.8%" },
  { product: "Climbing beans", market: "Musanze Market", district: "Musanze", wholesale: 860, retail: 1000, trend: "down", change: "-2.1%" },
  { product: "Tomatoes", market: "Nyanza Market", district: "Nyanza", wholesale: 680, retail: 850, trend: "up", change: "+9.4%" },
  { product: "Cassava flour", market: "Rwamagana Market", district: "Rwamagana", wholesale: 720, retail: 900, trend: "stable", change: "0.0%" },
  { product: "Rice (local)", market: "Huye Market", district: "Huye", wholesale: 1150, retail: 1350, trend: "down", change: "-1.2%" },
  { product: "Onions", market: "Kimironko", district: "Gasabo", wholesale: 640, retail: 800, trend: "up", change: "+5.6%" },
  { product: "Cabbage", market: "Rubavu Market", district: "Rubavu", wholesale: 260, retail: 350, trend: "stable", change: "+0.3%" },
];

export const crops = [
  { name: "Maize", emoji: "🌽", season: "Season A: Sep – Jan", regions: "Eastern Province, Bugesera", soil: "Well-drained loam, pH 5.8 – 7.0", yield: "3.5 – 5 t/ha" },
  { name: "Irish potatoes", emoji: "🥔", season: "Season A & B", regions: "Musanze, Burera, Nyabihu", soil: "Volcanic loam, pH 5.0 – 6.5", yield: "18 – 25 t/ha" },
  { name: "Climbing beans", emoji: "🫘", season: "Season A: Sep – Dec", regions: "Northern & Western highlands", soil: "Fertile loam, pH 5.5 – 6.5", yield: "2 – 3 t/ha" },
  { name: "Coffee (Arabica)", emoji: "☕", season: "Harvest: Mar – Jul", regions: "Huye, Nyamasheke, Gakenke", soil: "Deep volcanic, pH 5.2 – 6.0", yield: "1.2 – 2 t/ha cherries" },
  { name: "Rice", emoji: "🌾", season: "Marshland cycles", regions: "Bugarama, Rwamagana marshlands", soil: "Clay marshland soils", yield: "5 – 7 t/ha" },
  { name: "Cassava", emoji: "🍠", season: "12 – 18 month cycle", regions: "Eastern & Southern Province", soil: "Sandy loam, pH 5.5 – 6.5", yield: "15 – 25 t/ha" },
  { name: "Tomatoes", emoji: "🍅", season: "Year-round with irrigation", regions: "Bugesera, Kirehe, Nyanza", soil: "Sandy loam, pH 6.0 – 6.8", yield: "25 – 40 t/ha" },
  { name: "Tea", emoji: "🍃", season: "Year-round plucking", regions: "Nyaruguru, Rutsiro, Nyamagabe", soil: "Acidic highland, pH 4.5 – 5.5", yield: "8 – 12 t/ha green leaf" },
];

export const experts = [
  { name: "Dr. Aline Mukashema", field: "Agronomy & soil fertility", district: "Musanze", answers: 412, rating: 4.9 },
  { name: "Dr. Emmanuel Nsengiyumva", field: "Veterinary medicine", district: "Nyagatare", answers: 356, rating: 4.8 },
  { name: "Eng. Josiane Uwase", field: "Irrigation & water management", district: "Bugesera", answers: 208, rating: 4.7 },
  { name: "Dr. Patrick Gatera", field: "Crop pests & diseases", district: "Huye", answers: 289, rating: 4.9 },
];

export const knowledge = [
  { title: "Climate-smart maize: spacing, fertilizer and moisture", type: "Guide", minutes: "8 min read", topic: "Cereals" },
  { title: "Preventing late blight in Irish potatoes", type: "Video", minutes: "6 min watch", topic: "Pests & disease" },
  { title: "Post-harvest handling that keeps beans market-ready", type: "Guide", minutes: "10 min read", topic: "Post-harvest" },
  { title: "Drip irrigation on small plots: a practical setup", type: "PDF", minutes: "12 pages", topic: "Irrigation" },
  { title: "Feeding dairy cows for higher milk yields", type: "Audio", minutes: "14 min listen", topic: "Livestock" },
  { title: "Reading soil test results and choosing fertilizer", type: "Guide", minutes: "9 min read", topic: "Soil" },
];

export const news = [
  { title: "MINAGRI expands Season A subsidised fertilizer distribution", source: "MINAGRI", date: "12 Aug 2026" },
  { title: "NAEB reports a strong specialty coffee export season", source: "NAEB", date: "09 Aug 2026" },
  { title: "RAB issues fall armyworm alert for Eastern Province", source: "RAB", date: "05 Aug 2026" },
];

export const events = [
  { title: "Farmer field school: climbing bean staking", place: "Burera District", date: "22 Aug 2026" },
  { title: "Agri-Expo Rwanda — buyers and exporters meet", place: "Kigali, Gikondo", date: "04 Sep 2026" },
  { title: "Dairy hygiene and milk quality training", place: "Nyagatare District", date: "18 Sep 2026" },
];

export const weatherDays = [
  { day: "Today", icon: "⛅", high: 26, low: 15, rain: "35%" },
  { day: "Sun", icon: "🌧️", high: 24, low: 15, rain: "80%" },
  { day: "Mon", icon: "🌦️", high: 25, low: 14, rain: "55%" },
  { day: "Tue", icon: "☀️", high: 27, low: 15, rain: "10%" },
  { day: "Wed", icon: "⛅", high: 26, low: 16, rain: "25%" },
  { day: "Thu", icon: "🌧️", high: 23, low: 15, rain: "75%" },
  { day: "Fri", icon: "🌦️", high: 24, low: 15, rain: "60%" },
];

export const stats = [
  { value: "42,800", label: "Registered farmers" },
  { value: "1,960", label: "Verified buyers" },
  { value: "310", label: "Cooperatives" },
  { value: "30", label: "Districts covered" },
];
