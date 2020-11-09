import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  public navigations = [
    {
      label: 'accueil',
      link: '/',
      active: true
    },
    {
      label: 'candidat',
      link: '/dashboard/candidat',
      active: false
    },
    {
      label: 'entreprise',
      link: '/dashboard/entreprise',
      active: false
    },
    {
      label: 'infos',
      link: '/',
      active: false
    }
  ];
  public activeLink = this.navigations[0].label;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  updateNav(nav: any): void{
    this.updateActiveLink(nav.label);
    this.router.navigate([nav.link]);
  }

  private updateActiveLink(label: string): void{
    this.navigations.forEach(nav => nav.active = nav.label === label);
  }

}
