import {NgIf} from '@angular/common';
import {Component, EventEmitter, HostBinding, inject, input, Output, Renderer2} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {AvatarCircleComponent} from '../../../common-ui/avatar-circle/avatar-circle.component';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';
import type {Profile} from '../../../data/interfaces/profile.interface';
import {PostService} from '../../../data/services/post.service';
import {ProfileService} from '../../../data/services/profile.service';

@Component({
  selector: 'app-post-input',
  imports: [
    AvatarCircleComponent,
    NgIf,
    SvgIconComponent,
    FormsModule
  ],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  r2 = inject(Renderer2)
  profile = inject(ProfileService).me
  postService = inject(PostService)
  isCommentInput = input(false)
  postId = input<number>(0)
  postText = ''

  @Output() created = new EventEmitter()

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput()
  }

  onTextAreaInput($event: Event) {
    const textarea = $event.target as HTMLTextAreaElement

    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  onCreatePost() {
    if (!this.postText) return

    if (this.isCommentInput()) {
      firstValueFrom(this.postService.creatComment({
        text: this.postText,
        authorId: this.profile()!.id,
        postId: this.postId()
      })).then(() => {
        this.postText = ''
        this.created.emit()
      } )
      return;
    }
    firstValueFrom(this.postService.createPost({
      title: 'Ура создали пост!',
      authorId: this.profile()!.id,
      content: this.postText
    })).then(() => this.postText = '')
  }
}
