import { NgModule,  } from '@angular/core';
import { TabcommModule as LibModule } from '@mpblog/tabcomm';

@NgModule({
  imports: [LibModule],
  exports: [LibModule]
})
export class Module {}
