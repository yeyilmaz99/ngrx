import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostListComponent } from "./post-list/post-list.component";



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
    ],

    imports: [
        CommonModule, 
        RouterModule.forChild(routes), 
        FormsModule,
        ReactiveFormsModule
    ]

})
export class PostsModule {

}