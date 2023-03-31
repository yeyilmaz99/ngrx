import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PostsEffects } from "./state/posts.effects";
import { postsReducer } from "./state/posts.reducer";
import { POST_STATE_NAME } from "./state/posts.selector";
import { SinglePostComponent } from './single-post/single-post.component';



const routes: Routes = [
    {
        path:'', component:PostListComponent,
        children: [
          {path: 'add', component:AddPostComponent},
          {path:'edit/:id', component:EditPostComponent}
        ]
      }

]

@NgModule({
    declarations: [
        PostListComponent,
        AddPostComponent,
        EditPostComponent,
        SinglePostComponent,
    ],

    imports: [
        CommonModule, 
        RouterModule.forChild(routes), 
        FormsModule,
        EffectsModule.forFeature([PostsEffects]),
        ReactiveFormsModule,
        StoreModule.forFeature(POST_STATE_NAME,postsReducer)
    ]

})
export class PostsModule {

}