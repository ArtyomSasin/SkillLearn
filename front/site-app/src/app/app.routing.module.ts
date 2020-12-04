import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from './authorize.guard';
import { DefaultComponent } from './components/default/default.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { UnAuthorizeGuard } from './unauthorize.guard';
import { CourseModule } from './components/course/course.module';
import { AuthorModule } from './components/author/author.module';
import { NotAuthorComponent } from './components/not-author/not-author.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UnAuthorizeGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [UnAuthorizeGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthorizeGuard] },
  { path: 'user', component: UserComponent },
  { path: 'not-author', component: NotAuthorComponent },
  { path: '', component: DefaultComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CourseModule,
    AuthorModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
