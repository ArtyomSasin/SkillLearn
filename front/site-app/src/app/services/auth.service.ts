import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oidcSecurityService: OidcSecurityService) { }

  get isLoggedIn(): Observable<boolean> {
    return this.oidcSecurityService.isAuthenticated$;
  }

  get token(): string {
    return this.oidcSecurityService.getToken();
  }

  get userData(): Observable<any> {
    return this.oidcSecurityService.userData$;
  }

  checkAuth(): Observable<boolean> {
    return this.oidcSecurityService.checkAuth();
  }

  login(): Observable<void> {
    return of(this.oidcSecurityService.authorize());
  }

  signOut(): void {
    this.oidcSecurityService.logoff();
  }
}
