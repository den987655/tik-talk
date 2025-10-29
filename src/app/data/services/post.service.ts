import {HttpClient} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {map, switchMap, tap} from 'rxjs';
import type {CommentCreateDto, Post, PostComment, PostCreateDto} from '../interfaces/post.interface';
import type {Profile} from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  #http = inject(HttpClient)
  posts = signal<Post[]>([])
  constructor() { }

  createPost(payload: PostCreateDto) {
   return this.#http.post<Profile>(`${this.baseApiUrl}post/`, payload)
     .pipe(
       switchMap(() => {
         return this.fetchPosts()
       })
     )
  }
  fetchPosts() {
   return this.#http.get<Post[]>(`${this.baseApiUrl}post/`)
     .pipe(
       tap(res => this.posts.set(res))
     )
  }

  creatComment(payload: CommentCreateDto) {
    return this.#http.post<PostComment>(`${this.baseApiUrl}comment/`, payload)
  }
  getCommentByPostId(postId: number) {
    return this.#http.get<Post>(`${this.baseApiUrl}comment/${postId}`)
      .pipe(
        map(res => res.comments)
      )
  }
}
