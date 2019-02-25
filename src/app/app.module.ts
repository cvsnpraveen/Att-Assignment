//built-in imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { CreateComponent } from './user/create/create.component';

import { LoginComponent } from './user/login/login.component';
import { appRoutes } from './routes';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserService } from './common/user.service';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ViewAllComponent } from './user/view-all/view-all.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ViewProfileComponent } from './user/view-profile/view-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CreateComponent,
    LoginComponent,
    UserDashboardComponent,
    ViewAllComponent,
    ChangePasswordComponent,
    ViewProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
