import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { ProjectSelectorComponent } from './ui/project-selector.component';
import { ProjectSelectorContainerComponent } from './ui/project-selector.container';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule
  ],
  exports: [ProjectSelectorContainerComponent],
  declarations: [ProjectSelectorComponent, ProjectSelectorContainerComponent],
})
export class Module { }
