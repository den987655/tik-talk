import {createActionGroup, props} from '@ngrx/store';
import type {Profile} from '../interfaces/profile.interface';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    'set page': props<{page?: number}>(),
    'profiles loaded': props<{profilesProps: Profile[]}>(),
    'profiles filter': props<{ filtersProps: Record<string, any>}>()
  }
})
