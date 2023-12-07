import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { PostsComponent } from './posts.component';
// class mockPostsService {
//   getPosts() {}
//   deletePost(post: Post) {
//     return of(true);
//   }
// }
describe('Posts Component Isolated', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let postsService: any;
  let mockPostsService: any;
  let fixture: ComponentFixture<PostsComponent>;
  beforeEach(() => {
    POSTS = [
      {
        id: 1,
        body: 'body 1',
        title: 'title 1',
      },
      {
        id: 2,
        body: 'body 2',
        title: 'title 2',
      },
      {
        id: 3,
        body: 'body 3',
        title: 'title 3',
      },
    ];

    //-------------------------------------------------------------------
    mockPostsService = jasmine.createSpyObj('postsService', [
      'getPosts',
      'deletePost',
    ]);
    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: PostService,
          useValue: mockPostsService,
        },
      ],
    });
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;

    //-------------------------------------------------------------------
    // component = TestBed.inject(PostsComponent);
    // postsService = TestBed.inject(PostService);
    //-------------------------------------------------------------------
    // component = new PostsComponent(mockPostsService);
  });

  describe('delete method', () => {
    beforeEach(() => {
      mockPostsService.deletePost.and.returnValue(of(true));
      component.posts = POSTS;
    });
    it('should delete the selected post from the posts', () => {
      let deletingPost = POSTS.find((p) => p.id == 2);
      component.deletePost(deletingPost!);
      expect(component.posts.length).toBe(2);
      expect(component.posts.find((p) => p.id == deletingPost?.id)).toBeFalsy();
    });
    it('should call the delete method in post service only once', () => {
      // no need as we have used createSpyObj()
      // spyOn(mockPostsService, 'deletePost').and.callThrough(); //returnValue(of(true));
      component.deletePost(POSTS[2]);
      expect(mockPostsService.deletePost).toHaveBeenCalledTimes(1);
    });
  });

  // describe('get posts method', () => {

  // });

  it('should set posts from the service directly', () => {
    // return set value when call in testing
    mockPostsService.getPosts.and.returnValue(of(POSTS));
    // component.ngOnInit();
    fixture.detectChanges();
    expect(component.posts.length).toBe(3);
  });
});
