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
}
