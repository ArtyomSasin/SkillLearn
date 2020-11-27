import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from './authorize.guard';
import { DefaultComponent } from './components/default/default.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'post/:id', component: PostDetailComponent, canActivate: [AuthorizeGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', component: DefaultComponent },
  { path: '**', component: DefaultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
