import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './modules/core/core.component';
import { NoPageFoundComponent } from './modules/core/no-page-found/no-page-found.component';

const routes: Routes = [
  {
    path:'', redirectTo:'app/login', pathMatch:'full'
  },
 
  {
    path:'app', 
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) 
  },
  {
    path:'app', 
    component:CoreComponent,
    children: [
      { 
        path:'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) 

      }
    ]   
  },
  {
    path:'**', component:NoPageFoundComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
