import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AdvertComponent } from './advert/advert.component';
import { ErrorComponent } from './error/error.component';
import { UserComponent } from './user/user.component';
import { AuthorizationComponent } from './form/authorization/authorization.component';
import { RegistrationComponent } from './form/registration/registration.component';

// Prime NG
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { GalleriaModule } from 'primeng/galleria';
import { DividerModule } from 'primeng/divider';
import { Card, CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';

// Pipes
import { TranslatePipe } from '../shared/pipe/translate.pipe';
import { CustomSlicePipe } from '../shared/pipe/custom-slice.pipe';
import { PrivateComponent } from './private/private.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AdvertComponent,
    ErrorComponent,
    UserComponent,
    AuthorizationComponent,
    RegistrationComponent,
    TranslatePipe,
    CustomSlicePipe,
    PrivateComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    PasswordModule,
    SelectButtonModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
    GalleriaModule,
    DividerModule,
    CardModule,
    TooltipModule,
    InputTextareaModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
