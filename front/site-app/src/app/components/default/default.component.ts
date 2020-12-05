import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { SkillService } from 'src/app/services/skill.service';
import { UserService } from 'src/app/services/user.service';
import { Course } from 'src/app/shared/models/course';
import { SkillGroup } from 'src/app/shared/models/skill-group';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  skillGroups: SkillGroup[] = [];
  courses: Course[] = [];
  userSkillGroupIds: string[] = [];
  showProgress = false;

  get userName(): string | null | undefined {
    return this.authService.user?.displayName;
  }
  get userId(): string | null | undefined {
    return this.authService.user?.uid;
  }
  get isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  get canSearch(): boolean {
    return this.userSkillGroupIds.length > 0;
  }

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private skillService: SkillService,
    private userService: UserService,
    private ngZone: NgZone,
  ) {
    this.authService.onAuthUserSuccess.subscribe((value: any) => {
      this.ngZone.run(() => {
        this.showProgress = true;
        try {
          if (value) {
            this.loadSkills();
          }
        } catch (e) {
          console.error(e);
        }
        this.showProgress = false;
      });
    });
  }

  async ngOnInit(): Promise<void> {
    this.showProgress = true;
    try {
      this.skillGroups = await this.skillService.getAllSkillGroups();
      if (!this.userId) {
        await this.authService.getCurrentUser();
      } else {
        if (this.userSkillGroupIds.length === 0) {
          await this.loadSkills();
        }
      }
    } catch (e) {
      console.error(e);
    }
    this.showProgress = false;
  }

  async loadSkills(): Promise<void> {
    if (this.userId && this.isLogged) {
      this.userSkillGroupIds = await this.userService.getUserSkillGroupsIds(this.userId);
    } else {
      this.userSkillGroupIds = this.skillGroups.length > 0 ? [this.skillGroups[0].id] : [];
    }
    if (this.userSkillGroupIds?.length > 0) {
      await this.loadCourses();
    }
  }

  logout(): Promise<void> {
    return this.authService.logOut();
  }

  async loadCourses(): Promise<void> {
    this.showProgress = true;
    if (this.userSkillGroupIds.length > 0) {
      this.courses = await this.courseService.getCoursesBySkill(this.userSkillGroupIds);
    } else {
      this.courses = [];
    }
    this.showProgress = false;
  }

  isSelectedSkillGroup(skillGroup: SkillGroup): boolean {
    return this.userSkillGroupIds.find(id => id === skillGroup.id) != null;
  }

  async changeSkillGroup(skillGroup: SkillGroup): Promise<void> {
    const isSelected = this.isSelectedSkillGroup(skillGroup);
    if (isSelected) {
      const index = this.userSkillGroupIds.indexOf(skillGroup.id);
      this.userSkillGroupIds.splice(index, 1);
    } else {
      this.userSkillGroupIds.push(skillGroup.id);
    }
    if (this.userId && this.isLogged) {
      await this.userService.updateUserSkillGroups(this.userId, this.userSkillGroupIds);
    }
  }
}
