import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const isAuthorized = this.authService.isLoggedIn();
        if (!isAuthorized) {
            this.router.navigate(['/login']);
        }
        return isAuthorized;
    }
}
