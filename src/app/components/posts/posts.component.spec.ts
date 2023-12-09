import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import { PostsComponent } from './posts.component';
import { By } from '@angular/platform-browser';
import { SinglePostComponent } from '../single-post/single-post.component';
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

  // removed as we'll use original component for deep integration testing
  // @Component({
  //   selector: 'app-single-post',
  //   template: '<div></div>',
  // })
  // class FakePostComponent {
  //   @Input() post!: Post;
  // }
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
      declarations: [PostsComponent, SinglePostComponent],
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
    it('should call delete method when post component button is clicked', () => {
      spyOn(component, 'deletePost');
      mockPostsService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();

      let postComponentDEs = fixture.debugElement.queryAll(
        By.directive(SinglePostComponent)
      );

      for (let i = 0; i < postComponentDEs.length; i++) {
        postComponentDEs[i]
          .query(By.css('button'))
          .triggerEventHandler('click', { stopPropagation: () => {} });
        expect(component.deletePost).toHaveBeenCalledWith(POSTS[i]);
      }
    });

    it('should call the delete method when delete event is emitted in post component', () => {
      spyOn(component, 'deletePost');
      mockPostsService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();
      let singlePostComponentDEs = fixture.debugElement.queryAll(
        By.directive(SinglePostComponent)
      );

      for (let i = 0; i < singlePostComponentDEs.length; i++) {
        (
          singlePostComponentDEs[i].componentInstance as SinglePostComponent
        ).delete.emit(POSTS[i]);
        expect(component.deletePost).toHaveBeenCalledWith(POSTS[i]);
      }
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

  it('should create one post child element for each post', () => {
    mockPostsService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const postsELement = debugElement.queryAll(By.css('app-single-post'));
    expect(postsELement.length).toBe(POSTS.length);
  });

  it('should create exact same number of single post component with POSTS', () => {
    mockPostsService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const PostsComponentDEs = fixture.debugElement.queryAll(
      By.directive(SinglePostComponent)
    );
    expect(PostsComponentDEs.length).toBe(POSTS.length);
  });

  it('should create whther exact post is sending to singlePostComponent', () => {
    mockPostsService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const PostsComponentDEs = fixture.debugElement.queryAll(
      By.directive(SinglePostComponent)
    );
    for (let i = 0; i < PostsComponentDEs.length; i++) {
      let singlePostComponentInstance = PostsComponentDEs[i]
        .componentInstance as SinglePostComponent;
      expect(singlePostComponentInstance.post?.title).toEqual(POSTS[i].title);
    }
  });
});
