import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import { AuthInterceptor } from './auth.interceptor';

Sentry.init({
  dsn: 'https://50b2424fe5b94364b082afff3b113837@o465227.ingest.sentry.io/5477539',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'https://yourserver.io/api'],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    {// Aqui es como configuramos el interceptor que creamos para que se le aplique a cualquier peticion.
      provide: HTTP_INTERCEPTORS, // le pasamos el interceptor de angular por defecto.
      useClass: AuthInterceptor, // indicamos cual es el intercepto que va a utilizar
      multi: true, // Esto hace que se le aplique a todas.
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
