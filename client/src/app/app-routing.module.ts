import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { HomeVisitorComponent } from './pages/home-visitor/home-visitor.component';
import { PostViewComponent } from './pages/post-view/post-view.component';
import { PostEditComponent } from './pages/post-edit/post-edit.component';

const routes: Routes = [
  { path: 'home-admin', component: HomeAdminComponent },
  { path: 'home-visitor', component: HomeVisitorComponent },
  { path: 'post-view/:postId', component: PostViewComponent },
  { path: 'post-edit', component: PostEditComponent },
  { path: 'post-edit/:postId', component: PostEditComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home-visitor' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
