import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostsComponent,
  },
  {
    path: 'detail/:id',
    component: PostDetailsComponent,
  },
  {
    path: '**',
    redirectTo: 'posts',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
