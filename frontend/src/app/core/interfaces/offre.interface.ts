import { ICandidat, ICompetence, IFormation } from './candidat.interface';
import { IEntreprise } from './entreprise.interface';

export interface IOffre {
  _id?: string;
  codeOffre: number;
  description: string;
  titreOffre: string;
  status: number;
  entreprise?: IEntreprise;
  dateLimit: string;
  online: boolean;
  boosted?: boolean;
  city: string;
  dateDebut: string;
  duree: string;
  salaire: number;
  listeCandidats?: ICandidat[];
  competences: ICompetence[];
  formations: IFormation[];
  avantages: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IOffreInfos extends Pick<IOffre, 'codeOffre' | 'description' | 'titreOffre' | 'status' | 'online' | 'city' | 'salaire' | 'duree' | 'dateDebut' | 'dateLimit'> {
  codeOffre: number;
  description: string;
  titreOffre: string;
  status: number;
  online: boolean;
  city: string;
  salaire: number;
  duree: string;
  dateDebut: string;
  dateLimit: string;
}

export const defaultInfosOffre = {
  codeOffre: new Date().getTime(),
  description: '',
  titreOffre: '',
  status: 2,
  online: true,
  city: '',
  dateDebut: '',
  dateLimit: '',
  duree: '',
  salaire: 0
} as IOffreInfos;
