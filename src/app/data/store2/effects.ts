import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map, switchMap, tap, withLatestFrom} from 'rxjs';
import {ProfileService} from '../services/profile.service';
import {profileActions} from './actions';
import {selectProfileFilters, selectProfilePageable} from './selectors';

@Injectable({
  providedIn: 'root'
})

export class ProfileEffects {
  profileService: ProfileService = inject(ProfileService)
  actions$ = inject(Actions)
  store = inject(Store)

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        profileActions.profilesFilter,
        profileActions.setPage
        ),
      withLatestFrom(
        this.store.select(selectProfileFilters),
        this.store.select(selectProfilePageable)
      ),
      switchMap(([_, filters, pageable]) => {

        console.log(filters, pageable)
        return this.profileService.filterProfiles({
          ...pageable,
          ...filters
        })
      }),
        // this.ProfileService.filterProfiles(filters).pipe(
          map(res => profileActions.profilesLoaded({profilesProps: res.items}))
        // )
    )
  })
}
