import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from '../core/header/header.component';
import { FooterComponent } from '../core/footer/footer.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [HeaderComponent,FooterComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ButtonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonModule
  ]
})
export class SharedModule { }
