import {Routes} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';
import {caActivateAuth} from './auth/auth.guard';
import {LayoutComponent} from './common-ui/layout/layout.component';
import {ProfileEffects} from './data/store2/effects';
import {profilesReducer} from './data/store2/reducer';
import {chatsRoutes} from './pages/chats-page/chatsRoutes';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {SettingsPageComponent} from './pages/settings-page/settings-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'profile/me', pathMatch: 'full'},
      {path: 'profile/:id', component: ProfilePageComponent},
      {path: 'settings', component: SettingsPageComponent},
      {path: 'search', component: SearchPageComponent, providers: [
        provideState(profilesReducer),
          provideEffects(ProfileEffects)
        ]},
      {
        path: 'chats',
        loadChildren: () => chatsRoutes
      },
    ],
    canActivate: [caActivateAuth]
  },

  {path: 'login', component: LoginPageComponent},
];
