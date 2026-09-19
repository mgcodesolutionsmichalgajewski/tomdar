import originalAssets from "./assets.json";

export const assets = Object.fromEntries(
  Object.entries(originalAssets).map(([key, path]) => [
    key,
    `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`,
  ]),
) as typeof originalAssets;
export const navigation = [
  { label: "Home", href: "#start" },
  { label: "O firmie", href: "#o-firmie" },
  { label: "Usługi", href: "#uslugi" },
  { label: "Produkty", href: "#produkty" },
  { label: "Doradztwo", href: "#doradztwo" },
  { label: "Kontakt", href: "#kontakt" },
];
export const products = [
  {
    id: "okna",
    name: "Okna",
    description: "Systemy okienne i drzwiowe",
    image: assets.product1,
    legacyPath: "okna.html",
  },
  {
    id: "drzwi",
    name: "Drzwi",
    description: "Wewnętrzne i zewnętrzne",
    image: assets.product2,
    legacyPath: "drzwi.html",
  },
  {
    id: "bramy",
    name: "Bramy garażowe",
    description: "Rozwierane, uchylne, segmentowe",
    image: assets.product3,
    legacyPath: "bramy-garazowe.html",
  },
  {
    id: "parapety",
    name: "Parapety",
    description: "Wewnętrzne i zewnętrzne",
    image: assets.product4,
    legacyPath: "parapety.html",
  },
  {
    id: "rolety",
    name: "Rolety",
    description: "Wewnętrzne i zewnętrzne",
    image: assets.product5,
    legacyPath: "rolety.html",
  },
  {
    id: "zaluzje",
    name: "Żaluzje i rolety rzymskie",
    description: "Pionowe, poziome, plisowane",
    image: assets.product6,
    legacyPath: "zaluzje.html",
  },
  {
    id: "markizy",
    name: "Markizy i moskitiery",
    description: "Przesuwne, zwijane, okienne, na zawiasach",
    image: assets.product7,
    legacyPath: "markizy-moskitiery.html",
  },
  {
    id: "schody",
    name: "Schody strychowe",
    description: "Stacjonarne, segmentowe, nożycowe",
    image: assets.product8,
    legacyPath: "schody-strychowe.html",
  },
];
export const services = [
  {
    title: "Sprzedaż",
    text: "Pomożemy nadać niepowtarzalny charakter domu, biura czy pomieszczeń użytkowych. Podczas sprzedaży uwzględniamy unikalne cechy projektu.",
  },
  {
    title: "Doradztwo",
    text: "Zaproponujemy Państwu produkty najwyższej jakości w bogatej palecie kolorystycznej i ciekawym wzornictwie. Udzielimy praktycznych wskazówek!",
  },
  {
    title: "Montaż",
    text: "Dysponujemy własnym zespołem profesjonalistów trudniących się montażem stolarki zewnętrznej. Zapewniamy gwarancję!",
  },
];
export const advice = [
  {
    title: "Profesjonalne doradztwo podczas wyboru asortymentu",
    text: "Oferujemy pomoc podczas doboru elementów stolarki okiennej oraz drzwiowej. Uwzględniamy aktualne wymogi oraz preferencje dotyczące parametrów izolacyjności cieplnej, wytrzymałości konstrukcji, względów estetycznych czy dodatkowych funkcji: antywłamaniowej, przeciwpożarowej czy zabezpieczającej przed hałasem.",
  },
  {
    title: "Dla kogo świadczymy usługi?",
    text: "Swoją ofertę kierujemy zarówno do klientów indywidualnych, jak i firm. Specjalizujemy się w sprzedaży i montażu stolarki budowlanej. Realizujemy swoje usługi przy projektach mieszkań, domów i budynków mieszkalnych, obiektów przemysłowych oraz lokali różnego przeznaczenia. Także domów pasywnych i energooszczędnych.",
  },
  {
    title: "Kompleksowa obsługa klienta",
    text: "Dzięki długoletniej współpracy z największymi producentami jesteśmy w stanie zaproponować Państwu produkty najwyższej jakości. Zadbamy o Wasz komfort, funkcjonalność oraz przyjemność podczas korzystania z najnowocześniejszych, dostępnych na rynku rozwiązań.",
  },
];
export const partners = ["VEKA", "aluplast", "WIŚNIOWSKI", "PORTA DOORS", "FAKRO", "Perfecta"].map(
  (name, i) => ({ name, image: assets[`partner${i + 1}` as keyof typeof assets] }),
);
