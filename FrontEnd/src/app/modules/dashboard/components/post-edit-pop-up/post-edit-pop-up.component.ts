import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post.model';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/modules/home/services/auth.service';

@Component({
  selector: 'app-post-edit-pop-up',
  templateUrl: './post-edit-pop-up.component.html',
  styleUrls: ['./post-edit-pop-up.component.css'],
})
export class PostEditPopUpComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  post: Post;
  fileName: any;
  imageObj: any;
  constructor(
    private postService: PostsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.post = data?.post;
  }

  ngOnInit(): void {
    if (this.data.isEditingMode) {
      this.formGroup = new FormGroup({
        id: new FormControl(this.post.id),
        title: new FormControl(this.post?.title),
        url: new FormControl(this.post?.picture),
        userId: new FormControl(this.authService.getId()),
      });
    } else {
      this.formGroup = new FormGroup({
        title: new FormControl(this.post?.title, Validators.required),
        url: new FormControl(this.post?.picture, Validators.required),
        userId: new FormControl(this.authService.getId()),
      });
    }
  }

  public update() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const json = this.formGroup.value;
      const imageForm = new FormData();
      imageForm.append('image', this.imageObj);
      imageForm.append('title', json.title);
      imageForm.append('userId', json.userId);
      imageForm.append('id', json.id);

      this.postService.updatePost(imageForm).subscribe({
        next: () => {
          this.postService.postInsertSubject.next(true);
          this.dialog.closeAll();
          this.snackBar.open('la publication a été bien mise à jour', '', {
            duration: 2000,
            panelClass: ['green'],
          });
        },
        error: () => {
          this.snackBar.open('une erreur vient de se produire ', '', {
            duration: 2000,
            panelClass: ['red'],
          });
        },
      });
    }
  }
  async onImagePicked(event: any) {
    var img = new Image();
    let FILE = event.target.files[0];

    img.src = window.URL.createObjectURL(event.target.files[0]);
    img.onload = () => {
      this.imageObj = FILE;
      this.fileName = event.target.files[0].name;
      console.log('this.imageObj', this.imageObj);
    };
  }
  public createPost() {
    if (this.formGroup.valid) {
      const json = this.formGroup.value;
      const imageForm = new FormData();
      imageForm.append('image', this.imageObj);
      imageForm.append('title', json.title);
      imageForm.append('userId', json.userId);
      this.postService.createPost(imageForm).subscribe({
        next: () => {
          this.dialog.closeAll();
          this.postService.postInsertSubject.next(true);
          this.snackBar.open('la publication a été bien créée', '', {
            duration: 2000,
            panelClass: ['green'],
          });
        },
        error: () => {
          this.snackBar.open('une erreur vient de se produire ', '', {
            duration: 2000,
            panelClass: ['red'],
          });
        },
      });
    }
  }
}
