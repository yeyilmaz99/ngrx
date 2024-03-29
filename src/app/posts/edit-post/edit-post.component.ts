import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../state/posts.actions';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post:Post;
  postForm:FormGroup;
  postSubscription: Subscription
  constructor(
     private store :Store<AppState>,
     ) { }

  ngOnInit(): void {
    this.createForm();
    this.postSubscription = this.store.select(getPostById).subscribe(post => {
      if(post) {
        this.post = post;
        this.postForm.patchValue({
          title: post.title,
          description: post.description
        })
      }
    });
  }

  ngOnDestroy(): void {
    if(this.postSubscription){
      this.postSubscription.unsubscribe();
    }
  }

  createForm(){

    this.postForm = new FormGroup ({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    })

  }


  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm.touched && !descriptionForm.valid) {
      if (descriptionForm.errors.required) {
        return 'Description is required'
      }
      if (descriptionForm.errors.minlength) {
        return 'description should be of min 10 characters'
      }
    }
  }

  showTitleErrors(){
    const titleForm = this.postForm.get('title');
    if(titleForm.touched && !titleForm.valid){
      if(titleForm.errors.required){
        return 'Title is required';
      }

      if(titleForm.errors.minlength){
        return 'Title is must be min 6 characters';
      }
    }
  }

  onSubmit(){
    if(!this.postForm.valid){
      return;
    }
    const title = this.postForm.value.title;
    const description = this.postForm.value.description;
    const post : Post = {
      id: this.post.id,
      title, description
    }
    this.store.dispatch(updatePost({post}));
  }



}
