import { Component, OnInit } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
import { timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SelectedSkillGroup } from 'src/app/shared/models/skill-group';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  skillGroups: SelectedSkillGroup[] = [
    { isSelected: true, id: 1, title: 'Программирование' }
  ];

  get userName(): string | null | undefined {
    return this.authService.user?.displayName;
  }

  get isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  get canSearch(): boolean {
    return this.skillGroups.find(g => g.isSelected) != null;
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logOut();
  }

}
