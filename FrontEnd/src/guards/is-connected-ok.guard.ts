import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/home/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsConnectedOKGuards implements CanActivate {
  constructor(private _router: Router, private AuthService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.AuthService.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['sign-up']);
      return false;
    }
  }
}
