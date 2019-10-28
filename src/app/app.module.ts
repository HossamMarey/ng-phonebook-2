import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/users/user/user.component';
import { MainHeaderComponent } from './components/extra/main-header/main-header.component';
import { MainFooterComponent } from './components/extra/main-footer/main-footer.component';
import { UsersService } from './services/users.service';
import { HttpModule } from '@angular/http';


const appRoutes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  {
    path: 'users/:uid',
    component: UserComponent
  },
  { path: '**', component: UsersComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    MainHeaderComponent,
    MainFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes// <-- debugging purposes only , { enableTracing: true }
    )
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
