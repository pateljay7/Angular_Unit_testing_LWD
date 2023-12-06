import { first } from 'rxjs';
import { Post } from 'src/app/models/post';
import { SinglePostComponent } from './single-post.component';

describe('Post Component', () => {
  it('should raise and event when the delete post is clicked', () => {
    const component = new SinglePostComponent();
    const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
    component.post = post;

    component.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toBe(post);
    });

    component.onDeletePost(new MouseEvent('click'));
  });
});
