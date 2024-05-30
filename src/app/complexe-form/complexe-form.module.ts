import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplexeFormRoutingModule } from './complexe-form-routing.module';
import { ComplexeFormComponent } from './component/complexe-form/complexe-form.component';
import { SharedModule } from '../shared/shared.module';
import { ComplexeFormService } from './services/complexe-form.service';

@NgModule({
  declarations: [ComplexeFormComponent],
  imports: [CommonModule, ComplexeFormRoutingModule, SharedModule],
  providers: [ComplexeFormService],
})
export class ComplexeFormModule {}
