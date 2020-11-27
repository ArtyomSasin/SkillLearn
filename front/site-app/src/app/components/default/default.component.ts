import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { POSTS } from 'src/app/mock/default';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/shared/models/post';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  posts: Post[] = [];
  userData$?: Observable<any>;
  secretData$?: Observable<any>;
  isAuthenticated$?: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.posts = this.loadPosts();
    this.userData$ = this.authService.userData;
    this.isAuthenticated$ = this.authService.isLoggedIn;

    this.secretData$ = this.httpClient
      .get('api/post/getall')
      .pipe(catchError((error) => of(error)));
  }

  login(): Observable<void> {
    return this.authService.login();
  }

  logout(): void {
    this.authService.signOut();
  }

  loadPosts(): Post[] {
    return POSTS;
  }
}
