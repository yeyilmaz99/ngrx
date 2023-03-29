import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducer } from './store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component'
import { AuthEffects } from './auth/state/auth.effects';
import { AuthTokenInterceptor } from './services/AuthTokenInterceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './router/custom-serializer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),StoreRouterConnectingModule.forRoot({serializer:CustomSerializer}),
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthTokenInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
