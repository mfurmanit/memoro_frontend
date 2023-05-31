import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared.module';
import { CoreModule } from './core/core.module';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpMissingTranslationHandler } from '@others/http-missing-translation-handler';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './modules/main.module';
import { NgChartsModule } from 'ng2-charts';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorTranslator } from '@others/paginator-translator';

export const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader =
  (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    MainModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [HttpClient]},
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: HttpMissingTranslationHandler, deps: [HttpClient]}
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorTranslator
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
