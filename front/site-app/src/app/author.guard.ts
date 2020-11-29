import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthorService } from './services/author.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private authorService: AuthorService,
    ) { }

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        const isAuthorized = this.authService.isLoggedIn();
        const userId = this.authService.user?.uid;
        if (!isAuthorized) {
            return false;
        }
        if (userId) {
            const author = await this.authorService.getAuthor(userId);
            if (author && author.id === userId) { return true; }
        }
        return false;
    }
}
