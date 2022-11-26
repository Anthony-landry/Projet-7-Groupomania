import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';
import { MatDialog } from '@angular/material/dialog';
import { PostEditPopUpComponent } from '../post-edit-pop-up/post-edit-pop-up.component';
import { AuthService } from 'src/app/modules/home/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: any;
  @Input() isAdmin: boolean = false;
  @Input() idUserConnected: number = 0;

  constructor(private postService: PostsService, private dialog: MatDialog,private authService : AuthService) {}

  ngOnInit(): void {}

  public delete(): void {
    this.postService.deletePost(this.post.id, this.post.userId).subscribe({
      next: () => {
        this.postService.postInsertSubject.next(true);
      },
    });
  }

  public update(): void {
    this.dialog.open(PostEditPopUpComponent, {
      width: '50%',
      data: { post: this.post, isEditingMode: true },
    });
  }

  public likeHandler( postId: number): void {
    this.postService.likePost(this.authService.getId(), postId).subscribe({
      next: () => {
        this.postService.postInsertSubject.next(true);
      },
    });
  }
}
