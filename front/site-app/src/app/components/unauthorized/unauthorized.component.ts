import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  back(): void {
    this.location.back();
  }
  login(): void {
    this.authService.login();
  }
}
