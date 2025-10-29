import {DatePipe} from '@angular/common';
import {Component, inject, input, Input, type OnInit, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {AvatarCircleComponent} from '../../../common-ui/avatar-circle/avatar-circle.component';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';
import type {Post, PostComment} from '../../../data/interfaces/post.interface';
import {PostService} from '../../../data/services/post.service';
import {TestDirective} from '../post-feed/test.directive';
import {PostInputComponent} from '../post-input/post-input.component';
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
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  post = input<Post>()
  comments = signal<PostComment[]>([])
  directive = inject(TestDirective)

  constructor() {
    console.log(this.directive)
  }

  postService = inject(PostService)

 async ngOnInit() {
    this.comments.set(this.post()!.comments)
  }

  async onCreated() {
    const commentsRes = await firstValueFrom(this.postService.getCommentByPostId(this.post()!.id))
    this.comments.set(commentsRes)
  }
}
