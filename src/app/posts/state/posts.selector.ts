import { RouterState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/router/custom-serializer";
import { getCurrentRoute } from "src/app/router/router.selector";
import { PostsState } from "./posts.state";

export const POST_STATE_NAME = 'posts'
const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);


export const getPosts = createSelector(getPostsState, (state) => {
    return state.posts;
})

export const getPostById = createSelector(getPosts, getCurrentRoute, (posts:any, route:RouterStateUrl) => {
    return posts ? posts.find((post:any) => post.id === route.params['id']) : null;
})