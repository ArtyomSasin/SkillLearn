import { Component, OnInit } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  skillGroups: any[] = [
    { isSelected: true, id: 1, title: 'Программирование' }
  ];
  get userName(): string | null | undefined {
    return this.authService.user?.displayName;
  }

  get isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logOut();
  }

  selectSkillGroup($event: any, group: any): void {
    
  }
}
