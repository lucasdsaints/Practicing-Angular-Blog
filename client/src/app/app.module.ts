import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { HomeVisitorComponent } from './pages/home-visitor/home-visitor.component';
import { PostViewComponent } from './pages/post-view/post-view.component';
import { PostEditComponent } from './pages/post-edit/post-edit.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostsInfoComponent } from './components/posts-info/posts-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeAdminComponent,
    HomeVisitorComponent,
    PostViewComponent,
    PostEditComponent,
    PostCardComponent,
    PostsInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      tapToDismiss: true,
      progressAnimation: 'increasing'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
