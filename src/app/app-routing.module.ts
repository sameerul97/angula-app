import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { 
  AuthGuardService as AuthGuard 
} from './auth-guard.service';
import { RegisterComponent } from './register/register.component';
// import { HeroesComponent } from './heroes/heroes.component';
import { AppComponent } from './app.component';
import { JumboComponent } from 'src/app/jumbo/jumbo.component';
import { LoginComponent } from 'src/app/login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyNotesComponent } from './my-notes/my-notes.component';

const routes: Routes = [
  {
    path: '',
    component: JumboComponent
  },
  {
    path: 'home',
    component: JumboComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'userLogin',
    component: LoginComponent
  },
  {
    path: 'myProfile',
    component: MyProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myNotes',
    component: MyNotesComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'home' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
