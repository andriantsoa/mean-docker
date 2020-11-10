import { IContact } from './contact.interface';

export interface IJobOffer {
  title: string;
  enterprise: string;
  domaine: string;
  lieu: string;
  date: number;
  advantages?: string;
  description: string;
  resume?: string;
  prerequis?: string;
  salaire?: number;
  conditions?: any;
  contact?: IContact;
  zoom?: boolean;
  focused?: boolean;
}
