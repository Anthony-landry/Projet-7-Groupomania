import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../home/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postInsertSubject = new BehaviorSubject(false);
  constructor(private http: HttpClient,private authService : AuthService) {}

  public getPosts(): Observable<Post[]> {
    let params: HttpParams = new HttpParams();
    params.append("userId",this.authService.getId())
    return this.http.get<Post[]>(environment.backEndUrl + 'post/getall',{params : {userId : this.authService.getId()}});
  } 

  public deletePost(id: number, userId: number) {
    return this.http.post(environment.backEndUrl + 'post/delete', {
      userId: userId,
      id: id,
    });
  }

  public updatePost(post: FormData) {
    return this.http.put(environment.backEndUrl + 'post/update', post);
  }

  public createPost(post: FormData) {
    return this.http.post(environment.backEndUrl + 'post/create', post);
  }

  public likePost(userId : number,postId : number){
    return this.http.post(environment.backEndUrl + 'like/post', {userId,postId});

  }
}
