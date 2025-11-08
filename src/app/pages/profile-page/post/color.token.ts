import {InjectionToken} from '@angular/core'
import type {PostService} from '../../../data/services/post.service';

export const COLOR = new InjectionToken<string>('It is border color', {
  providedIn: 'root',
  factory: () => 'blue'
})

export const TIMELINE_SERVICE = new InjectionToken<PostService>('TIMELINE_SERVICE')
