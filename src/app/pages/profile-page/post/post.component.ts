import {DatePipe} from '@angular/common';
import {Component, inject, input, type OnInit, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {AvatarCircleComponent} from '../../../common-ui/avatar-circle/avatar-circle.component';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';
import type {Post, PostComment} from '../../../data/interfaces/post.interface';
import {PostService} from '../../../data/services/post.service';
import {PostInputComponent} from '../post-input/post-input.component';
import {TIMELINE_SERVICE} from './color.token';
import {CommentComponent} from './comment/comment.component';

@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [
    {
      provide: TIMELINE_SERVICE,
      useExisting: PostService
    }
  ]
})
export class PostComponent implements OnInit{
  post = input<Post>()
  comments = signal<PostComment[]>([])

  postService = inject(TIMELINE_SERVICE) as PostService

  constructor() {
    // console.log(this.directive.nodeName)
    console.log(this.postService.id)
  }

 async ngOnInit() {
    this.comments.set(this.post()!.comments)
  }

  async onCreated() {
    const commentsRes = await firstValueFrom(this.postService.getCommentByPostId(this.post()!.id))
    this.comments.set(commentsRes)
  }
}
