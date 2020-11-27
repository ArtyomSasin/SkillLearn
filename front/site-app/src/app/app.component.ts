import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService
      .checkAuth()
      .subscribe((isAuthenticated) => {
        console.log('app authenticated', isAuthenticated);
      }, e => {
        console.error('error authenticated', e);
      });
  }
}
