import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    console.log('user is logged: ', this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {
      console.log('user login: ', this.authService.user);
    }
    else {
      await this.authService.loginAnonymous();
      console.log('user login anonimus: ', this.authService.user);
    }
  }
}
