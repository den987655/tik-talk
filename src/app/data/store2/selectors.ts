import {createSelector} from '@ngrx/store';
import {profileActions} from './actions';
import {profilesReducer} from './reducer';


// export const selectFilteredProfiles = createSelector(
//   profileFeature.selectProfiles,
//   (profiles) => profiles
// )
export const selectFeatureProfile = createSelector(
  profilesReducer.selectProfile,
  (profile) => profile
)
export const selectProfilePageable = createSelector(
  profilesReducer.selectProfileFeature2State,
  (state) => {
    return {
      page: state.page,
      size: state.size
    }
  }
)
export const selectProfileFilters = createSelector(
  profilesReducer.selectProfileFilters,
  (filters) => filters
)
