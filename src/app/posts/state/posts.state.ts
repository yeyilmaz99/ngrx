import { Post } from "src/app/models/post.model"


export interface PostsState {
    posts : Post[];
}

export const initialState: PostsState = {
    posts: null
}