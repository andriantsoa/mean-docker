import { Component, OnInit } from '@angular/core';
import { IJobOffer } from '../commun/interfaces/job-offer.interface';

@Component({
  selector: 'app-asako',
  templateUrl: './asako.component.html',
  styleUrls: ['./asako.component.scss']
})
export class AsakoComponent implements OnInit {

  public items = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' },
  ];
  jobOffers: IJobOffer[];

  constructor() { }

  ngOnInit(): void {
    this.jobOffers = [
      {
        title: 'developpeur full stack',
        date: 1604663216955,
        resume: '',
        enterprise: 'CGI',
        domaine: 'informatique',
        lieu: 'Paris',
        advantages: '13eme mois + ticket restaurant + transport',
        description: 'Cherche un agent expert en ANgular et Java pour une equipe agile a taille humaine. disponible de suite',
        prerequis: '2 ans dexperience sur es6, diplome ingenieur informatique ou master equivqlent',
        salaire: 45000,
        conditions: {},
        contact: {
          label: 'Sale Manager',
          email: 'test.test@test.test'
        }
      },
      {
        title: 'developpeur mean stack',
        enterprise: 'ANDRIAN&CO',
        date: 1604663216955,
        domaine: 'informatique',
        lieu: 'Lille',
        advantages: 'teletravail 100%',
        description: 'Cherche un agent expert en Angular 10 et Node.js pour une equipe agile a taille humaine. disponible de suite',
        prerequis: '3 ans dexperience sur le stack, diplome ingenieur informatique ou master equivqlent',
        salaire: 49000,
        conditions: {},
        contact: {
          label: 'Sale Manager',
          email: 'test.test@test.test'
        }
      },
      {
        title: 'Administrateur reseau',
        enterprise: 'ANDRIAN&CO',
        date: 1604663216955,
        domaine: 'informatique',
        lieu: 'Antananarivo',
        advantages: 'teletravail 100%',
        description: 'Cherche un agent expert en Angular 10 et Node.js pour une equipe agile a taille humaine. disponible de suite',
        prerequis: '3 ans dexperience sur le stack, diplome ingenieur informatique ou master equivqlent',
        salaire: 49000,
        conditions: {},
        contact: {
          label: 'Sale Manager',
          email: 'test.test@test.test'
        }
      },
      {
        title: 'Consultant RH',
        enterprise: 'Conseil-RH',
        domaine: 'Aeronautique',
        date: 1604663216955,
        lieu: 'Antananarivo',
        advantages: 'teletravail 100%',
        description: 'Cherche un agent expert en Angular 10 et Node.js pour une equipe agile a taille humaine. disponible de suite',
        prerequis: '3 ans dexperience sur le stack, diplome ingenieur informatique ou master equivqlent',
        salaire: 49000,
        conditions: {},
        contact: {
          label: 'Sale Manager',
          email: 'test.test@test.test'
        }
      },
      {
        title: 'Consultant Marketing',
        enterprise: 'Conseil-RH',
        domaine: 'Aeronautique',
        date: 1604663216955,
        lieu: 'Antananarivo',
        advantages: 'teletravail 100%',
        description: 'Cherche un agent expert en Angular 10 et Node.js pour une equipe agile a taille humaine. disponible de suite',
        prerequis: '3 ans dexperience sur le stack, diplome ingenieur informatique ou master equivqlent',
        salaire: 49000,
        conditions: {},
        contact: {
          label: 'Sale Manager',
          email: 'test.test@test.test'
        }
      }
    ];
  }

  public addSlide(): void {
    this.items.push({
      title: `Slide 4`
    });
  }

}
