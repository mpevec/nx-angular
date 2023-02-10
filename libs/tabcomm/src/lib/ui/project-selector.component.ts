import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tabcomm-project-selector-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="container">
              <div class="field">
                <label class="label">Project number:</label>
                <div class="control">
                  <input class="input" type="text" [formControl]="pid">
                </div>
              </div>
              <button class="button is-link" (click)="submit()">Send</button>
            </div>`
})
export class ProjectSelectorComponent {
  @Output() changePid: EventEmitter<string> = new EventEmitter<string>();

  pid: FormControl = new FormControl<string>('');

  public submit(): void {
    this.changePid.emit(this.pid.value);
  }
}
