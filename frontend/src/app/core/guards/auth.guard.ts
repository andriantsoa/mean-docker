import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService, private location: Location) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (typeof window !== 'undefined') {
      const c = this.userService.getCurrentUser();
      if (c) {
        if (c.active === false) {
          if (this.location.path().startsWith('/dashboard/validation?validationKey=')) {
            return true;
          }
          this.router.navigate(['/']);
        }
        // logged in so return true
        return true;
      }
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
