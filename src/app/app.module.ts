//built-in imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
//components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { CreateComponent } from './user/create/create.component';
import { LoginComponent } from './user/login/login.component';
import { appRoutes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CreateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
