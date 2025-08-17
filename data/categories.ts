export const CATEGORIES_BY_URL = {
    "anne-sagligi":   { id: 2, name: "Anne Sağlığı" },
    "bebek-bakimi":   { id: 3, name: "Bebek Bakımı" },
    "cocuk-gelisimi": { id: 4, name: "Çocuk Gelişimi" },
    "hamilelik":      { id: 5, name: "Hamilelik" },
  } as const;
  
  export type UrlCategorySlug = keyof typeof CATEGORIES_BY_URL;