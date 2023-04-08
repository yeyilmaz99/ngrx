import { RouterState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/router/custom-serializer";
import { getCurrentRoute } from "src/app/router/router.selector";
import { PostsState, postsAdapter } from "./posts.state";

export const POST_STATE_NAME = 'posts'
const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const postsSelectors = postsAdapter.getSelectors();
export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);
export const getPostEntities = createSelector(getPostsState, postsSelectors.selectEntities);

export const getPostById = createSelector(getPostEntities, getCurrentRoute, (posts:any, route:RouterStateUrl) => {
    return posts ? posts[route.params['id']]: null;
})