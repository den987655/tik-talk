import {createFeature, createReducer, on} from '@ngrx/store';
import type {Profile} from '../interfaces/profile.interface';
import {profileActions} from './actions';

export interface ProfileState2 {
  profile: Profile[]
  profileFilters: Record<string, any>
  page: number,
  size: number
}

export const initialState: ProfileState2 = {
  profile: [],
  profileFilters: {},
  page: 1,
  size: 10
}

export const profilesReducer = createFeature({
  name: 'ProfileFeature2',
  reducer: createReducer(
    initialState,
    on(profileActions.profilesLoaded, (state, payload) => ({
      ...state,
      profile: state.profile.concat(payload.profilesProps)
    })),
    on(profileActions.profilesFilter, (state, payload) => ({
      ...state,
      profile: [],
      profileFilters: payload.filtersProps
    })),
    on(profileActions.setPage, (state, payload) =>  {
      let page = payload.page
      if (!page) page = state.page + 1

        return {
        ...state,
        page
        }
    })
  )
})
