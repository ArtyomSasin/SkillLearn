import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  get userName(): string | null | undefined {
    return this.authService.user?.displayName;
  }
  get userId(): string | null | undefined {
    return this.authService.user?.uid;
  }
  get isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  logout(): Promise<void> {
    return this.authService.logOut();
  }
}
