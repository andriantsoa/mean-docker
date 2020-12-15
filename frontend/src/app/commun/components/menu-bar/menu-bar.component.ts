import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IUser } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/services';
import { LoginService } from '../user-login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  public pushRightClass: string;
  public connectedUser: IUser;
  public isActivatedUser: boolean;
  public profilId: string;
  public candidatId: string;

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
  public activeLink: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches), shareReplay());

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  public updateNav(nav: any): void {
    let param;
    switch (nav.label) {
      case 'candidat':
        param = this.candidatId;
        break;
      case 'entreprise':
        param = this.candidatId;
        break;
      default:
        param = '';
    }
    this.updateActiveLink(nav.label);
    this.router.navigate([`${nav.link}/${param}`]);
  }

  private updateActiveLink(label: string): void {
    this.navigations.forEach(nav => nav.active = nav.label === label);
  }

  public ngOnInit(): void {
    this.connectedUser = this.userService.getCurrentUser();
    if (this.connectedUser.profils[0]) {
      this.profilId = this.connectedUser.profils[0]._id;
      this.candidatId = this.connectedUser.profils[0].candidat;
    }
    this.isActivatedUser = this.connectedUser.active;
    this.updateLabelByUrl(this.router.url);
  }

  private updateLabelByUrl(url: string): void {
    const splitedUrl = (url) ? url.split('/') : ['', ''];
    const path = (splitedUrl && splitedUrl.length <= 2) ? `${splitedUrl[0]}/${splitedUrl[1]}` : `${splitedUrl[0]}/${splitedUrl[1]}/${splitedUrl[2]}`;
    const navigation = this.navigations.find(nav => path === nav.link);
    if (navigation) {
      this.updateNav(navigation);
    }
  }

  public onLoggedout(): void {
    this.loginService.logout();
    delete this.connectedUser;
  }

}
