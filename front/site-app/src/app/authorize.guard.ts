import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        await this.authService.getCurrentUser();
        const isAuthorized = this.authService.isLoggedIn();
        if (!isAuthorized) {
            this.router.navigate(['/login']);
        }
        return isAuthorized;
    }
}
