import { IDemande, IOffre } from './candidat.interface';

export interface IEntreprise {
  _id?: string;
  immatriculation: string;
  presentation: string;
  nomPublic: string;
  status: string;
  nbSalaries: number;
  mission: string;
  dateFondation: string;
  demandes: [IDemande];
  offres: [IOffre];
  createdAt?: string;
  updatedAt?: string;
}

export interface IEntrepriseInfos extends Pick<IEntreprise, 'immatriculation' | 'presentation' | 'nomPublic' | 'status' | 'nbSalaries' | 'dateFondation'> {
  immatriculation: string;
  presentation: string;
  nomPublic: string;
  status: string;
  nbSalaries: number;
  mission: string;
  dateFondation: string;
}

export const defaultInfosEntreprise = {
  immatriculation: '',
  presentation: '',
  nomPublic: '',
  status: null,
  nbSalaries: 0,
  mission: '',
  dateFondation: ''
} as IEntrepriseInfos;


