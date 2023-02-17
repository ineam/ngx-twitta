import {Injectable} from '@angular/core';
import {TweetService} from './services/tweet.service';
import {mapTo, Observable, tap} from 'rxjs';
import {Tweet} from './types/tweet.type';
import {Select, Store} from '@ngxs/store';
import {TweetState} from '../state-management/tweet/state';
import {TweetActions} from '../state-management/tweet/actions';
import FetchAll = TweetActions.FetchAll;
import AddTweet = TweetActions.AddTweet;
import DeleteTweet = TweetActions.DeleteTweet;
import ToggleLike = TweetActions.ToggleLike;

@Injectable({
  providedIn: 'root'
})
export class AppSandbox {
  @Select(TweetState) tweets$!: Observable<Tweet[]>;

  constructor(private store: Store,
              private tweetService: TweetService) {
  }

  loadTweets(): Observable<boolean> {
    return this.tweetService.fetchAll().pipe(
      tap((tweets: Tweet[]) => this.store.dispatch(new FetchAll(tweets))),
      mapTo(true)
    );
  }

  addTweet(message: string, twitterHandle: string): Observable<boolean> {
    return this.tweetService.addTweet(message, twitterHandle).pipe(
      tap((tweet) => this.store.dispatch(new AddTweet(tweet))),
      mapTo(true)
    );
  }

  removeTweet(tweetId: number): Observable<boolean> {
    return this.tweetService.removeTweet(tweetId)
      .pipe(
        tap(() => this.store.dispatch(new DeleteTweet(tweetId))),
        mapTo(true)
      );
  }

  toggleLikeTweet(tweetId: number): Observable<boolean> {
    return this.tweetService.toggleLikeTweet(tweetId)
      .pipe(
        tap(() => this.store.dispatch(new ToggleLike(tweetId))),
        mapTo(true)
      );
  }
}
