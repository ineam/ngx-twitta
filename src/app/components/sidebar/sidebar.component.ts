import {Component, Input} from '@angular/core';
import {Tweet} from '../../types/tweet.type';

@Component({
  selector: 'amk-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  template: `
    <h1>Liked</h1>

    <table>
      <tbody>
      <tr *ngFor="let tweet of tweets">
        <td>{{tweet.tweetHandler}}</td>
        <td>{{tweet.message}}</td>
      </tr>
      </tbody>
    </table>
  `
})
export class SidebarComponent {
  @Input() tweets!: Tweet[] | null;
}
