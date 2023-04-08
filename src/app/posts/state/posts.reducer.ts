import { createReducer, on } from '@ngrx/store';
import {
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.actions';
import { initialState, postsAdapter } from './posts.state';

const _postReducer = createReducer(
  initialState,

  on(addPostSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, state);
  }),
  on(updatePostSuccess, (state, action) => {
    return postsAdapter.updateOne(action.post, state)
  }),
  on(deletePostSuccess, (state, action) => {
    return postsAdapter.removeOne(action.id, state);
  }),
  on(loadPostsSuccess, (state, action) => {
    return postsAdapter.setAll(action.posts, state);
  })
);

export function postsReducer(state: any, action: any) {
  return _postReducer(state, action);
}
