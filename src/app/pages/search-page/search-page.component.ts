import {Component, inject, type OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ProfileCardComponent} from '../../common-ui/profile-card/profile-card.component';
import {SidebarPortalComponent} from '../../common-ui/sidebar-portal/sidebar-portal.component';
import {ProfileService} from '../../data/services/profile.service';
import {selectFeatureProfile} from '../../data/store2/selectors';

import {ProfileFiltersComponent} from './profile-filters/profile-filters.component';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    SidebarPortalComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent implements OnInit{
  profileService = inject(ProfileService)
  store = inject(Store)
  profiles = this.store.selectSignal(selectFeatureProfile)


  ngOnInit() {
  // this.store.select(selectFilteredProfiles).pipe(
  //   take(1)
  // )

  }
  // profilesLength = computed(()=> this.profiles()?.length ?? 0)

  constructor() {

  }
}
