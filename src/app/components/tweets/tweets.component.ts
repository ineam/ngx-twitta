import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tweet} from '../../types/tweet.type';

@Component({
  selector: 'amk-tweets',
  styleUrls: ['./tweets.component.scss'],
  template: `
    <h1>tweets</h1>
    <input type="text"
           placeholder="search"
           (keyup)="toSearch($event)"/>
    <table>
      <tbody>
      <tr *ngFor="let tweet of tweets">
        <td>{{tweet.tweetHandler}}</td>
        <td>{{tweet.message}}</td>
        <td>
          <button *ngIf="tweet.liked" (click)="toggleLike.emit(tweet.id)">❤️</button>
          <button *ngIf="!tweet.liked" (click)="toggleLike.emit(tweet.id)">🤍</button>
        </td>
        <td>
          <button (click)="remove.emit(tweet.id)">❌</button>
        </td>
      </tr>
      </tbody>
    </table>
  `
})
export class TweetsComponent {
  @Input() tweets!: Tweet[] | null;
  @Output() toggleLike = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();

  toSearch(event: Event) {
    this.search.emit((event.target as HTMLInputElement).value);
  }
}
