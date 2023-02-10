import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectSelectorContainerComponent } from './ui/project-selector.container';

const routes: Routes = [
  {
    path: '',
    component: ProjectSelectorContainerComponent,
  },
  {
    path: 'project',
    loadChildren: () => import('./pages/project/project.module').then(p => p.ProjectModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
