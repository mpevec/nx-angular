import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'tabcomm', loadChildren: () => import('./features/tabcomm.module').then(m => m.Module) },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
