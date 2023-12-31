import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentComponent } from './components/student/student.component';
import { SignupFormComponent } from './components/reactive-form/signup-form/signup-form.component';
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    SinglePostComponent,
    PostDetailsComponent,
    StudentComponent,
    SignupFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
