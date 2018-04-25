import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { GooglePlus } from '@ionic-native/google-plus';

import { httpFactory } from './http.factory';

import { NextFocusDirective } from '../directives/nextfocus.directive';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { CardPage } from '../pages/card/card';

import { AuthenticationProvider } from '../providers/authentication/authentication';
import { UserProvider } from '../providers/user/user';
import { TodoProvider } from '../providers/todo/todo';
import { ItemProvider } from '../providers/item/item';
import { JwtProvider } from '../providers/jwt/jwt';
import { TodoComponent } from '../components/todo/todo';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    CardPage,
    TodoComponent,
    NextFocusDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__tododb',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    CardPage,
    TodoComponent
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    UserProvider,
    TodoProvider,
    ItemProvider,
    JwtProvider,
    GooglePlus
  ]
})
export class AppModule {}
