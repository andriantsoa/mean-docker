export interface ICandidat {
  _id?: string;
  posteActuel: string;
  presentation: string;
  disponible: boolean;
  metier: string;
  status: number;
  experiences: [IExperience];
  competences: [ICompetence];
  aspirations: [string];
  formations: [IFormation];
  demandes: [IDemande];
  offres: [IOffre];
  createdAt?: string;
  updatedAt?: string;
}

export interface IExperience {
  label: string;
  status: number;
  entreprise: string;
  competence: [ICompetence];
  duree: number;
  debut: string;
  fin: string;
  secteur: [string];
}

export interface IFormation {
  titre: string;
  filiere: [string];
  niveau: string;
  etablissement: string;
  debut: string;
  fin: string;
}

export interface ICompetence {
  titre: string;
  niveau: number;
  version: string;
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

export interface IOffre {
  numOffre: number;
  description: string;
  titreOffre: string;
  status: string;
  entreprise: IEntreprise;
  listeCandidats: [ICandidat];
  dateLimit: string;
  competencesRequises: [ICompetence];
  formationsRequises: [IFormation];
  avantages: [string];
  salaire: number;
  publish: boolean;
  createdAt?: string;
  updatedAt?: string;
}

import { IUser } from './user.interface';
export interface IEntreprise {
  immatricularion: string;
  presentation: string;
  nomPublic: string;
  status: string;
  user: IUser;
  nbSalaries: number;
  mission: string;
  dateFondation: string;
  demandes: [IDemande];
  offres: [IOffre];
  createdAt?: string;
  updatedAt?: string;
}
