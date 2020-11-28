import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UnAuthorizeGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const isAuthorized = this.authService.isLoggedIn();

        return isAuthorized ? false : true;
    }
}
