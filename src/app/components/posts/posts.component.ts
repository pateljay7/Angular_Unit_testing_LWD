import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postsService: PostService) {}
  ngOnInit(): void {
    this.getPosts();
  }
  getPosts() {
    this.postsService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
    });
  }
  deletePost(post: Post) {
    this.posts = this.posts.filter((p) => p.id != post.id);
    this.postsService.deletePost(post).subscribe();
  }
}
