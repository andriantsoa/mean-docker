import { ICandidat, ICompetence, IEntreprise, IFormation } from 'src/app/core/interfaces';
import { IContact } from './contact.interface';

export interface IJobOffer {
  domaine: string;
  date: number;
  resume?: string;
  contact?: IContact;
  zoom?: boolean;
  focused?: boolean;

  // news
  titreOffre: string;
  online: boolean;
  _id?: string;
  codeOffre?: number;
  description?: string;
  status?: number;
  entreprise?: IEntreprise;
  dateLimit?: string;
  city?: string;
  dateDebut?: string;
  duree?: string;
  salaire?: number;
  listeCandidats?: ICandidat[];
  competences?: ICompetence[];
  formations?: IFormation[];
  avantages?: string[];
  createdAt?: string;
  updatedAt?: string;
}
