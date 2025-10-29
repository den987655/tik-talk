import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map, switchMap, tap} from 'rxjs';
import {ProfileService} from '../services/profile.service';
import {profileActions} from './actions';

@Injectable({
  providedIn: 'root'
})

export class ProfileEffects {
  ProfileService: ProfileService = inject(ProfileService)
  actions$ = inject(Actions)
  store = inject(Store)

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      // ofType(
      //   profileActions.updateFilters),
      switchMap(({filters}) =>
        this.ProfileService.filterProfiles(filters).pipe(
          map(res => profileActions.profilesLoaded({profilesProps: res.items}))
        )
      ),
    )
  })

}
