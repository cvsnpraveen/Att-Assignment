import {Routes} from '@angular/router';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './user/login/login.component';

export const appRoutes: Routes = [
    {
        path: 'login', component:UserComponent,
        children: [{ path:'', component:LoginComponent}]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
]

