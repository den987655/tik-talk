import {resolve} from '@angular/compiler-cli';
import {Component, inject, OnDestroy, type OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {debounceTime, Subject, switchMap, take, takeUntil} from 'rxjs';
import {ProfileService} from '../../../data/services/profile.service';
import {profileActions} from '../../../data/store2/actions';
import {profilesReducer} from '../../../data/store2/reducer';


@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnDestroy, OnInit {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  store = inject(Store)
  private destroy$ = new Subject<void>();

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  })

  ngOnInit() {
    // Восстанавливаем состояние фильтров из store
    // this.store.select(profileFeature.selectProfileFilters).pipe(
    //   take(1)).subscribe(filters => {
    //     this.searchForm.patchValue(filters, {emitEvent: false})
    // })
    // this.profileService.filterProfiles({}).pipe(
    //   take(1)).subscribe(res => {
    //     this.store.dispatch(profileActions.profilesLoaded({
    //       profilesProps: res.items
    //     }))
    // })

    // this.store.select(profilesReducer.selectProfile).pipe(
    //   take(1),
    //   takeUntil(this.destroy$)
    // ).subscribe(profiles => {
      // if (profiles.length === 0) {
      // this.store.dispatch(profileActions.updateFilters({
      //   filters: {firstName: '', lastName: '', stack: ''}
      // }))
      // }
    //})


    // Подписываемся на изменения формы
    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        // Сохраняем фильтры и запускаем фильтрацию

        // this.store.dispatch(profileActions.updateFilters({ filters }));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  constructor() {

  }

}
