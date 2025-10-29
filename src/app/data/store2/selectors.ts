import {createSelector} from '@ngrx/store';
import {profilesReducer} from './reducer';


// export const selectFilteredProfiles = createSelector(
//   profileFeature.selectProfiles,
//   (profiles) => profiles
// )
export const selectFeatureProfile = createSelector(
  profilesReducer.selectProfile,
  (profile) => profile
)
