import {createActionGroup, props} from '@ngrx/store';
import type {Profile} from '../interfaces/profile.interface';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    'profiles loaded': props<{profilesProps: Profile[]}>()
  }
})
