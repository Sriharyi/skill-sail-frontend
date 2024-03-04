import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {HomeModule} from "./features/home/home.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./core/interceptors/jwt.interceptor";
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';


@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
