import { HttpClient } from '@angular/common/http';
import { PostService } from './post.service';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('PostService', () => {
  let postService: PostService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let POSTS = [
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

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    // postService = new PostService(httpClientSpy);
    TestBed.configureTestingModule({
      providers: [
        PostService,
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ],
    });
    postService = TestBed.inject(PostService);
  });
  describe('getPosts()', () => {
    it('should return expected posts when getPosts is called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(POSTS));
      postService.getPosts().subscribe({
        next: (posts) => {
          expect(posts).toEqual(POSTS);
          done(); // in case subscribe() may take some to execute
        },
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});
