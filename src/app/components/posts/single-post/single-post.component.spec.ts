import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs';
import { Post } from 'src/app/models/post';
import { SinglePostComponent } from './single-post.component';

describe('Post Component', () => {
  let component: SinglePostComponent;
  let fixture: ComponentFixture<SinglePostComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePostComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(SinglePostComponent);
    component = fixture.componentInstance;
  });

  it('should create post component using TestBed', () => {
    expect(component).toBeDefined();
  });
  it('should render the post title in the anchor element', () => {
    const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
    component.post = post;
    fixture.detectChanges(); // to detect changes in html page
    const postElement: HTMLElement = fixture.nativeElement;
    const a = postElement.querySelector('a');
    expect(a?.textContent).toContain(post.title);
  });
  it('should raise and event when the delete post is clicked', () => {
    const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
    component.post = post;
    component.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toBe(post);
    });
    component.onDeletePost(new MouseEvent('click'));
  });
});
