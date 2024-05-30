import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'social-media',
    loadChildren: () =>
      import('./social-media/social-media.module').then(
        (m) => m.SocialMediaModule
      ),
  },
  {
    path: 'complexe-form',
    loadChildren: () =>
      import('./complexe-form/complexe-form.module').then(
        (m) => m.ComplexeFormModule
      ),
  },
  {
    path: 'reactive-state',
    loadChildren: () =>
      import('./reactive-state/reactive-state.module').then(
        (m) => m.ReactiveStateModule
      ),
  },
  {
    path: '**',
    redirectTo: 'social-media', // Assuming you want to redirect to 'social-media' for any undefined routes
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
