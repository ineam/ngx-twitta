import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, Observable} from 'rxjs';
import {AppSandbox} from '../../app.sandbox';
import {Tweet} from '../../types/tweet.type';

@Component({
  selector: 'amk-root',
  styleUrls: ['./app.container.scss'],
  template: `
    <amk-topbar (addTweet)="onAddTweet($event)"></amk-topbar>

    <div class="bottom">
      <amk-sidebar [tweets]="likedTweets$ | async"></amk-sidebar>

      <amk-tweets [tweets]="filteredTweets$ | async"
                  (search)="search$.next($event)"
                  (remove)="onRemoveTweet($event)"
                  (toggleLike)="onToggleLikeTweet($event)">
      </amk-tweets>
    </div>
  `
})
export class AppContainer implements OnInit {
  tweets$: Observable<Tweet[]> = this.sb.tweets$;

  likedTweets$: Observable<Tweet[]> = this.tweets$.pipe(
    map((tweets: Tweet[]) => tweets.filter(tweet => tweet.liked))
  );
  search$: BehaviorSubject<string> = new BehaviorSubject('');
  optimizedTerm$: Observable<string> = this.search$.pipe(
    debounceTime(200),
    distinctUntilChanged()
  );
  filteredTweets$: Observable<Tweet[]> = combineLatest(this.optimizedTerm$, this.tweets$,
    (search: string, tweets: Tweet[]) => {
      return tweets.filter((tweet: Tweet) => tweet.message.includes(search));
    }
  );

  constructor(private sb: AppSandbox) {
  }

  ngOnInit(): void {
    this.sb.loadTweets().subscribe();
  }

  onRemoveTweet(tweetId: number): void {
    this.sb.removeTweet(tweetId).subscribe();
  }

  onToggleLikeTweet(tweetId: number): void {
    this.sb.toggleLikeTweet(tweetId).subscribe();
  }

  onAddTweet(message: string): void {
    const twitterHandler = '@jean-mouloud';
    this.sb.addTweet(message, twitterHandler).subscribe();
  }
}
