import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { ValidateIdentificationComponent } from './validate-identification/validate-identification.component';
import { ValidatePinComponent } from './validate-pin/validate-pin.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [AuthComponent, ValidateIdentificationComponent, ValidatePinComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NgxDropzoneModule,
    TranslateModule
  ]
})
export class AuthModule { }
