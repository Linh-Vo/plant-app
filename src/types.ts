export type ScreenName =
  | 'Around'
  | 'Scan'
  | 'Home'
  | 'Community'
  | 'Collection';

export interface ScreenProps {
  name: string;
}

export interface Scientific {
  scientificNameWithoutAuthor: string;
  scientificNameAuthorship: string;
  scientificName: string;
}
export interface Species {
  scientificNameWithoutAuthor: string;
  scientificNameAuthorship: string;
  genus: Scientific;
  family: Scientific;
  commonNames: string[];
  scientificName: string;
  customName?: string;
}

export interface PlantImage {
  organ?: 'flower';
  author?: string;
  url: {
    m: string;
  };
}

export interface PlantWikiInfo {
  introduction?: string;
  description?: string[];
}
export interface PlantResult {
  score: string;
  species: Species;
  images: PlantImage[];
  wikiInfo?: PlantWikiInfo;
  inCollection?: string;
}

export type SnapInfo = PlantResult & {
  date: string;
  id: string;
  image?: string;
};

export interface EbayItems {
  itemId: string[];
  title: string[];
  galleryURL: string[];
  viewItemURL: string[];
  location: string[];
  country: string[];
  sellingStatus: [
    {
      currentPrice: [
        {
          '@currencyId': string;
          __value__: string;
        },
      ];
      sellingState: string[];
    },
  ];
}
