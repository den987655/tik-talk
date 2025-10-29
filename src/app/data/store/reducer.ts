// import {createFeature, createReducer, on} from '@ngrx/store';
// import type {Profile} from '../interfaces/profile.interface';
// import {profileActions} from './actions';
// //
// export interface ProfileState {
//   profiles: Profile[];
//   profileFilters: Record<string, any>;
// }
//
// export const initialState: ProfileState = { //начальное значение
//   profiles: [],
//   profileFilters: {},
// };
// //
// export const profileFeature = createFeature({
//   name: 'profileFeature1', //имя уникальное должно быть
//   reducer: createReducer(
//     initialState,
//     on(profileActions.profilesLoaded, (state, payload) => ({
//         ...state,
//         profiles: payload.profiles,
//     })),
//     on(profileActions.updateFilters, (state, payload) => ({
//         ...state,
//       profileFilters: payload.filters,
//     })),
//   )
//   });
