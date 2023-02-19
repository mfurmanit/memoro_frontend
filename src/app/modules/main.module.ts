import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MainRoutingModule } from './main.routing.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [],
  providers: []
})
export class MainModule {
}
