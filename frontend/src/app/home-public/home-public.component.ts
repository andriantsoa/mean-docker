import { Component, OnInit } from '@angular/core';
import { IJobOffer } from '../commun/interfaces/job-offer.interface';
import { ICompetence, IEntreprise, IFormation } from '../core/interfaces';
import { OffreService } from '../core/services';

@Component({
  selector: 'app-home-public',
  templateUrl: './home-public.component.html',
  styleUrls: ['./home-public.component.scss']
})
export class HomePublicComponent implements OnInit {

  public items = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' },
  ];
  public boostedJobOffers: IJobOffer[];

  constructor(private offreService: OffreService) { }

  ngOnInit(): void {
    this.offreService.getPublicOffers({}).subscribe(list => this.boostedJobOffers = list);
    // this.jobOffers = [
    //   {
    //     titreOffre: 'developpeur full stack',
    //     date: 1604663216955,
    //     resume: '',
    //     entreprise: { nomPublic: 'CGI' } as IEntreprise,
    //     domaine: 'informatique',
    //     city: 'Paris',
    //     // advantages: '13eme mois + ticket restaurant + transport',
    //     description: 'Cherche un agent expert en ANgular et Java pour une equipe agile a taille humaine. disponible de suite',
    //     competences: [{ titre: 'angular', niveau: 1 } as ICompetence],
    //     formations: [{ titre: 'informatique' } as IFormation],
    //     // prerequis: '2 ans dexperience sur es6, diplome ingenieur informatique ou master equivqlent',
    //     salaire: 45000,
    //     avantages: ['resto', 'transport', '13eme mois'],
    //     contact: {
    //       label: 'Sale Manager',
    //       email: 'test.test@test.test'
    //     },
    //     online: true
    //   },
    //   {
    //     titreOffre: 'developpeur mean stack',
    //     entreprise: { nomPublic: 'ANDRIAN&CO' } as IEntreprise,
    //     date: 1604663216955,
    //     domaine: 'informatique',
    //     city: 'Lille',
    //     avantages: ['teletravail 100%'],
    //     description: 'Cherche un agent expert en Angular 10 et Node.js pour une equipe agile a taille humaine. disponible de suite',
    //     competences: [{ titre: 'angular', niveau: 3 } as ICompetence],
    //     formations: [{ titre: 'ingenieur informatique' } as IFormation],
    //     // prerequis: '3 ans dexperience sur le stack, diplome ingenieur informatique ou master equivqlent',
    //     salaire: 49000,
    //     // conditions: {},
    //     contact: {
    //       label: 'Sale Manager',
    //       email: 'test.test@test.test'
    //     },
    //     online: true
    //   },
    //   {
    //     titreOffre: 'Administrateur reseau',
    //     entreprise: { nomPublic: 'ANDRIAN&CO' } as IEntreprise,
    //     date: 1604663216955,
    //     domaine: 'informatique',
    //     city: 'Antananarivo',
    //     avantages: ['teletravail 100%'],
    //     description: 'Cherche un agent expert en Angular 10 et Node.js pour une equipe agile a taille humaine. disponible de suite',
    //     competences: [{ titre: 'linux', niveau: 3 } as ICompetence],
    //     formations: [{ titre: 'ingenieur informatique' } as IFormation],
    //     // prerequis: '3 ans dexperience sur le stack, diplome ingenieur informatique ou master equivqlent',
    //     salaire: 49000,
    //     // conditions: {},
    //     contact: {
    //       label: 'Sale Manager',
    //       email: 'test.test@test.test'
    //     },
    //     online: true
    //   },
    //   {
    //     titreOffre: 'Consultant RH',
    //     entreprise: { nomPublic: 'Conseil-RH' } as IEntreprise,
    //     domaine: 'Aeronautique',
    //     date: 1604663216955,
    //     city: 'Antananarivo',
    //     avantages: ['teletravail 100%'],
    //     description: 'Cherche un agent expert en Angular 10 et Node.js pour une equipe agile a taille humaine. disponible de suite',
    //     competences: [{ titre: 'recrutement', niveau: 3 } as ICompetence],
    //     formations: [{ titre: 'licence rh' } as IFormation],
    //     // prerequis: '3 ans dexperience sur le stack, diplome ingenieur informatique ou master equivqlent',
    //     salaire: 49000,
    //     // conditions: {},
    //     contact: {
    //       label: 'Sale Manager',
    //       email: 'test.test@test.test'
    //     },
    //     online: true
    //   },
    //   {
    //     titreOffre: 'Consultant Marketing',
    //     entreprise: { nomPublic: 'Conseil-RH' } as IEntreprise,
    //     domaine: 'Aeronautique',
    //     date: 1604663216955,
    //     city: 'Antananarivo',
    //     avantages: ['teletravail 100%'],
    //     description: 'Cherche un agent expert en Angular 10 et Node.js pour une equipe agile a taille humaine. disponible de suite',
    //     competences: [{ titre: 'marketing', niveau: 3 } as ICompetence],
    //     formations: [{ titre: 'licence marketing' } as IFormation],
    //     // prerequis: '3 ans dexperience sur le stack, diplome ingenieur informatique ou master equivqlent',
    //     salaire: 49000,
    //     // conditions: {},
    //     contact: {
    //       label: 'Sale Manager',
    //       email: 'test.test@test.test'
    //     },
    //     online: true
    //   }
    // ];
  }

  public addSlide(): void {
    this.items.push({
      title: `Slide 4`
    });
  }

}
