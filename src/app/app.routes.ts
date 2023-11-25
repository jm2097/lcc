import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewProfileComponent } from './pages/new-profile/new-profile.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfilesListComponent } from './pages/profiles-list/profiles-list.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'profiles',
		component: ProfilesListComponent,
	},
	{
		path: 'profiles/:userId',
		component: ProfileComponent,
	},
	{
		path: 'new-profile',
		component: NewProfileComponent,
	},
];
