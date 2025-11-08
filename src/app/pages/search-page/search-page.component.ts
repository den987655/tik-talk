import {Component, inject, type OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {ProfileCardComponent} from '../../common-ui/profile-card/profile-card.component';
import {SidebarPortalComponent} from '../../common-ui/sidebar-portal/sidebar-portal.component';
import {ProfileService} from '../../data/services/profile.service';
import {profileActions} from '../../data/store2/actions';
import {selectFeatureProfile} from '../../data/store2/selectors';

import {ProfileFiltersComponent} from './profile-filters/profile-filters.component';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    SidebarPortalComponent,
    InfiniteScrollDirective
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',

})
export class SearchPageComponent implements OnInit{
  selector: string = '.main-panel';
  profileService = inject(ProfileService)
  store = inject(Store)
  profiles = this.store.selectSignal(selectFeatureProfile)

  ngOnInit() {
  // this.store.select(selectFeatureProfile).pipe(
  //   take(1)
  // )

  }
  // profilesLength = computed(()=> this.profiles()?.length ?? 0)

  constructor() {

  }

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}))
  }

  onIntersection(entries: IntersectionObserverEntry[]) {
    if (!entries.length) return
    if (entries[0].intersectionRatio > 0) {
      this.timeToFetch()
    }
  }

  onScroll() {
    console.log('scroll')
    this.timeToFetch()
  }
}
