import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'amk-topbar',
  styleUrls: ['./topbar.component.scss'],
  template: `
    <div class="container-fluid">
      <h1>Post a new tweet</h1>
      <div class="container">
        <input class="post-wrapper" [(ngModel)]="message" />
        <button class="btn btn-primary" (click)="post()">Tweet</button>
      </div>
    </div>
  `
})
export class TopbarComponent {
  @Output() addTweet = new EventEmitter<string>();

  message: string = '';

  post(): void {
    this.addTweet.emit(this.message);
    this.message = '';
  }
}
