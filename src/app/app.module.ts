import {registerLocaleData} from "@angular/common";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import locale from "@angular/common/locales/uk";
import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';
import {AuthInterceptor} from "./shared/auth.interceptor";
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {PostComponent} from './shared/components/post/post.component';
import {SharedModule} from "./shared/shared.module";

registerLocaleData(locale, 'uk')

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
