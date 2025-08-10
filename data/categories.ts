export const CATEGORIES_BY_URL = {
    "anne-sagligi":   { id: 9, name: "Anne Sağlığı" },
    "bebek-bakimi":   { id: 10, name: "Bebek Bakımı" },
    "cocuk-gelisimi": { id: 11, name: "Çocuk Gelişimi" },
    "hamilelik":      { id: 7, name: "Hamilelik" },
  } as const;
  
  export type UrlCategorySlug = keyof typeof CATEGORIES_BY_URL;