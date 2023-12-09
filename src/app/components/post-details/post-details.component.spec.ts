import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailsComponent } from './post-details.component';
import { Location } from '@angular/common';
import { PostService } from 'src/app/services/post/post.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('PostDetailComponent', () => {
  let fixture: ComponentFixture<PostDetailsComponent>;
  let component: PostDetailsComponent;
  let mockPostService: jasmine.SpyObj<PostService>;
  let mockLocation: jasmine.SpyObj<Location>;
  beforeEach(() => {
    let mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          },
        },
      },
    };
    mockPostService = jasmine.createSpyObj(['getPost', 'updatePost']);
    mockLocation = jasmine.createSpyObj(['back']);
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PostDetailsComponent],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: PostService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });
    fixture = TestBed.createComponent(PostDetailsComponent);
  });

  it('should render the post title in the h2 template', () => {
    mockPostService.getPost.and.returnValue(
      of({
        id: 3,
        title: 'title 1',
        body: 'body 1',
      })
    );
    fixture.detectChanges();
    // const element = fixture.debugElement.query(By.css('h2'))
    //   .nativeElement as HTMLElement;
    const element = fixture.nativeElement.querySelector('h2') as HTMLElement;
    expect(element.textContent).toEqual(fixture.componentInstance.post.title);
  });
});
