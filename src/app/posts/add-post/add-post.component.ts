import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {


  postForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    })
  }

  onAddPost() {
    console.log(this.postForm.value);
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


}
