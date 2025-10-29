import {Component, ElementRef, HostListener, inject, Renderer2} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {PostService} from '../../../data/services/post.service';
import {PostInputComponent} from '../post-input/post-input.component';
import {COLOR} from '../post/color.token';
import {PostComponent} from '../post/post.component';

@Component({
  selector: 'app-post-feed',
  imports: [
    PostInputComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  providers: [
    {
      provide: COLOR,
      useValue: 'orange'
    }
  ]
})
export class PostFeedComponent {
  postService = inject(PostService)
  hostElement = inject(ElementRef)
  r2 = inject(Renderer2)

  feed = this.postService.posts

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed()
  }

  constructor() {
    firstValueFrom(this.postService.fetchPosts())
  }

  ngAfterViewInit() {
this.resizeFeed()
  }
  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect()

    const height = window.innerHeight - top -24 - 24
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
    console.log(height)
  }

}
