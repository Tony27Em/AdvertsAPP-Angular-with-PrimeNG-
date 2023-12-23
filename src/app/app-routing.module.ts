import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { AdvertComponent } from './advert/advert.component';
import { UserComponent } from './user/user.component';
import { PrivateComponent } from './private/private.component';
import { ErrorComponent } from './error/error.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { 
    path: 'form', 
    loadChildren: () => import('./form/form.module').then(m => m.FormModule),
  },
  { path: 'advert/:id', component: AdvertComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'private', component: PrivateComponent },
  { path: 'edit', component: EditComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
