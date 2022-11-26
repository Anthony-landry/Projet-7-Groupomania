import { Component, OnInit } from '@angular/core';
import { PostsService } from './services/posts.service';
import { Post } from './models/post.model';
import { url } from 'inspector';
import { AuthService } from '../home/services/auth.service';
import { Role } from '../home/role.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean = false;
  posts: Post[] = [];

  constructor(
    private postService: PostsService,
    private authService: AuthService
  ) {}
  idUserConnected: number = this.authService.getId();

  ngOnInit(): void {
    this.authService.getRole().forEach((role: Role) => {
      if (role.name === 'admin') this.isAdmin = true;
    });
    this.postService.postInsertSubject.subscribe(() => {
      this.getPost();
    });
  }

  getPost() {
    this.postService.getPosts().subscribe({
      next: (result) => {
        console.log('result', result);
        this.posts = result;
      },
    });
  }
}
