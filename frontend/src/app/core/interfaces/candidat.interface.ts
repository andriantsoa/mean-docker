import { IEntreprise } from './entreprise.interface';
import { IOffre } from './offre.interface';

export interface ICandidat {
  _id?: string;
  posteActuel: string;
  presentation: string;
  disponible: boolean;
  metier: string;
  status: number;
  experiences?: [IExperience];
  competences?: [ICompetence];
  aspirations?: [string];
  formations?: [IFormation];
  demandes?: [IDemande];
  offres?: [IOffre];
  createdAt?: string;
  updatedAt?: string;
}

export interface IExperience {
  label: string;
  status?: number;
  entreprise?: string;
  competence?: [ICompetence];
  duree?: number;
  debut?: string;
  fin?: string;
  details?: string;
  secteur?: [string];
}

export interface IFormation {
  titre: string;
  filiere?: [string];
  niveau?: string;
  etablissement?: string;
  debut?: string;
  fin?: string;
  details?: string;
}

export interface ICompetence {
  titre: string;
  niveau?: number;
  version?: string;
}

export interface IDemande {
  numDemande: number;
  description: string;
  titreOffre: string;
  status: string;
  listeEntreprise: [IEntreprise];
  dateDisponibilte: string;
  secteur: [string];
  salaire: number;
  publish: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const defaultCompetence = {
  titre: '',
  niveau: null,
  version: ''
} as ICompetence;

export const defaultExperience = {
  label: '',
  aspirations: [''],
  status: 1,
  secteur: [''],
  entreprise: '',
  competence: [{} as ICompetence],
  duree: 1,
  debut: '',
  fin: '',
  details: '',
} as IExperience;

export const defaultFormation = {
  titre: '',
  groupe: [''],
  filiere: [''],
  niveau: '',
  etablissement: '',
  debut: '',
  fin: '',
  details: '',
} as IFormation;

export const defaultInfosCandidat = {
  posteActuel: '',
  presentation: '',
  metier: '',
  status: null,
  disponible: true,
} as ICandidatInfos;

export interface ICandidatInfos extends Pick<ICandidat, 'posteActuel' | 'presentation' | 'metier' | 'status' | 'disponible'> {
  posteActuel: string;
  presentation: string;
  disponible: boolean;
  metier: string;
  status: number;
}
