import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ProjectContainerComponent } from './project.container';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ProjectContainerComponent,
      }
    ])
  ],
  declarations: [ProjectContainerComponent, ProjectComponent],
})
export class ProjectModule { }
