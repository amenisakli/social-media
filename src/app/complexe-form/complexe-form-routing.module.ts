import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplexeFormComponent } from './component/complexe-form/complexe-form.component';

const routes: Routes = [{ path: '', component: ComplexeFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplexeFormRoutingModule {}
