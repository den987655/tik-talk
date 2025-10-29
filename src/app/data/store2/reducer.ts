import {createFeature, createReducer, on} from '@ngrx/store';
import type {Profile} from '../interfaces/profile.interface';
import {profileActions} from './actions';

export interface ProfileState2 {
  profile: Profile[]
}

export const initialState: ProfileState2 = {
  profile: []
}

export const profilesReducer = createFeature({
  name: 'ProfileFeature2',
  reducer: createReducer(
    initialState,
    on(profileActions.profilesLoaded, (state, payload) => ({
      ...state,
      profile: payload.profilesProps
    }))
  )
})
