import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap, switchMap, tap } from "rxjs";
import { PostsService } from "src/app/services/post.service";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage } from "src/app/store/shared/shared.actions";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";

@Injectable()
export class PostsEffects {
    constructor(private actions$: Actions, private postsService:PostsService, private store:Store<AppState>, private router:Router){

    }

    loadPost$ = createEffect(() => {
        return this.actions$.pipe(ofType(loadPosts), mergeMap((action) => {
            return this.postsService.getPosts().pipe(map((posts) => {
                return loadPostsSuccess({posts})
            }))
        }))
    })


    addPost$ = createEffect(() => {
        return this.actions$.pipe(ofType(addPost), mergeMap(action => {
            return this.postsService.addPost(action.post).pipe(map(data => {
                const post = {...action.post, id:data.name};
                return addPostSuccess({post});
            }))
        }))
    },)

    updatePost$ = createEffect (() => {
        return this.actions$.pipe(ofType(updatePost), switchMap((action)=> {
            return this.postsService.updatePost(action.post).pipe(map((data) => {
                return updatePostSuccess({post:action.post, redirect:true})

            }))
        }))
    })

    deletePost$ = createEffect (() => {
        return this.actions$.pipe(ofType(deletePost), switchMap((action)=> {
            return this.postsService.deletePost(action.id).pipe(map((data) => {
                return deletePostSuccess({id:action.id})
            }))
        }))
    })


    updateRedirect$ = createEffect(
        () => {
          return this.actions$.pipe(
            ofType(...[updatePostSuccess]),
            tap((action)=> {
              this.store.dispatch(setErrorMessage({message:''}))
              if(action.redirect) {
                this.router.navigate(['/posts']);
              }
            })
          )
        },
        {dispatch: false}
      )

    



}