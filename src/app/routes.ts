import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CreateComponent } from './user/create/create.component';
import { LoginComponent } from './user/login/login.component';
import { ViewProfileComponent } from './user/view-profile/view-profile.component';
import { ViewAllComponent } from './user/view-all/view-all.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AuthGuard } from './auth/auth.guard';
export const appRoutes: Routes = [
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: LoginComponent }]
    },
    {
        path: 'create', component: UserComponent,
        children: [{ path: '', component: CreateComponent }]
    },
    {
        path: 'userDashboard', component: UserDashboardComponent, canActivate: [AuthGuard],
        children: [
            { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
            { path: 'view', component: ViewProfileComponent, canActivate: [AuthGuard] },
            { path: 'viewAll', component: ViewAllComponent, canActivate: [AuthGuard] },
            { path: 'change', component: ChangePasswordComponent, canActivate: [AuthGuard] },
            { path: 'deleteUser', component: ViewAllComponent, canActivate: [AuthGuard] }
        ]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
]

