import {DatePipe} from '@angular/common';
import {Component, inject, input, type OnInit} from '@angular/core';
import {AvatarCircleComponent} from '../../../../common-ui/avatar-circle/avatar-circle.component';
import type {PostComment} from '../../../../data/interfaces/post.interface';
import {PostService} from '../../../../data/services/post.service';

@Component({
  selector: 'app-comment',
  imports: [
    AvatarCircleComponent,
    DatePipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = input<PostComment>()
}
