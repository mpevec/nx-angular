import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mpblog-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <h1 class="title">
        Please choose the article:
      </h1>
      <ul>
        <li>
          <a routerLink="/tabcomm">Communication between tabs</a>
        </li>
      </ul>
    </div>`
})
export class HomeComponent { }
