import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { JwtInterceptor } from "./core/interceptors/jwt.interceptor";
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { SafeurlPipe } from './shared/pipes/safeurl.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    SafeurlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LoaderComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
