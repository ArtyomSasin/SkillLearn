import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  skillGroups$ = new Observable<SkillGroup[]>();
  courses: Course[] = [];
  userSkillGroupIds: string[] = [];

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
  ) {
  }

  ngOnInit(): void {
    this.authService.onAuthUserSuccess.subscribe((value: any) => {
      if (value) {
        this.loadSkills();
      }
    });
    this.loadSkills();
  }

  async loadSkills(): Promise<void> {
    this.skillGroups$ = this.skillService.getAllSkillGroups();
    if (this.userId && this.isLogged) {
      this.userSkillGroupIds = await this.userService.getUserSkillGroupsIds(this.userId);
      if (this.userSkillGroupIds?.length > 0) {
        await this.loadCourses();
      }
      console.log('userSkillGroupIds changes: ', this.userSkillGroupIds);
    }
  }

  logout(): Promise<void> {
    return this.authService.logOut();
  }

  loadCourses(): void {
    if (this.userSkillGroupIds.length > 0) {
      this.courseService.getCoursesBySkill(this.userSkillGroupIds).subscribe(courses => {
        this.courses = courses;
        console.log('courses: ', courses);
      });
    }
    else {
      this.courses = [];
    }
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
      console.log('updateUserSkillGroups: ', this.userSkillGroupIds);
      await this.userService.updateUserSkillGroups(this.userId, this.userSkillGroupIds);
    }
  }
}
