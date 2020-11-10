import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from 'src/app/core/models/user.interface';
import { UserService } from 'src/app/core/services';
import { LoginService } from '../asako-login/login.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  public pushRightClass: string;
  public connectedUser: User;

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
    .pipe(map(result => result.matches), shareReplay());

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  public updateNav(nav: any): void {
    this.updateActiveLink(nav.label);
    this.router.navigate([nav.link]);
  }

  private updateActiveLink(label: string): void {
    this.navigations.forEach(nav => nav.active = nav.label === label);
  }

  public ngOnInit(): void {
    this.connectedUser = this.userService.getCurrentUser();
    this.updateLabelByUrl(this.router.url);
  }

  private updateLabelByUrl(url: string): void {
    const navigation = this.navigations.find(nav => nav.link === url);
    if (navigation) {
      this.updateNav(navigation);
    }
  }

  public onLoggedout(): void {
    this.loginService.logout();
    delete this.connectedUser;
  }

}
