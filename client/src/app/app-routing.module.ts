import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: 'posts-list', component: PostsListComponent },
  { path: 'post', component: PostComponent },
  { path: '', pathMatch: 'full', redirectTo: 'posts-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
