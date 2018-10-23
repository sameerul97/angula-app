import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
// import { HeroesComponent } from './heroes/heroes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JumboComponent } from './jumbo/jumbo.component';
import { FooterComponent } from './footer/footer.component';
import { LaunchappComponent } from './launchapp/launchapp.component';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from 'src/app/login.service';
import { HttpClientModule } from '@angular/common/http';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ModalComponent } from './modal/modal.component';
import { MyNotesComponent } from './my-notes/my-notes.component';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumboComponent,
    FooterComponent,
    LaunchappComponent,
    RegisterComponent,
    LoginComponent,
    MyProfileComponent,
    ModalComponent,
    MyNotesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
