import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Tweet} from '../types/tweet.type';
import {delay} from 'rxjs/operators';

// mock service like a real http service
@Injectable({
  providedIn: "root"
})
export class TweetService {
  ctr = 0;
  tweets = this._generateFakeTweets(2);

  fetchAll(): Observable<Tweet[]> {
    return of(this.tweets);
  }

  removeTweet(id: number): Observable<boolean> {
    this.tweets = this.tweets.filter(v => v.id !== id);
    return of(true).pipe(delay(1000));
  }

  addTweet(message: string, tweetHandler: any): Observable<Tweet> {
    this.ctr++;
    const newTweet = {message, tweetHandler, liked: false, id: this.ctr};
    this.tweets = [...this.tweets, newTweet]
    return of({...newTweet}).pipe(delay(1000));
  }

  toggleLikeTweet(id: number): Observable<boolean> {
    this.tweets = this.tweets.map(tweet => tweet.id === id ? {...tweet, liked: !tweet.liked} : tweet);
    return of(true).pipe(delay(1000));
  }

  private _generateFakeTweets(amount: number): Tweet[] {
    const tweets = [];
    for (let i = 0; i < amount; i++) {
      this.ctr++;
      tweets.push({tweetHandler: '@zubeeda', message: 'Wassuuuuuup', liked: false, id: this.ctr});
      this.ctr++;
      tweets.push({tweetHandler: '@luciano', message: 'ciao fratello', liked: true, id: this.ctr});
      this.ctr++;
      tweets.push({tweetHandler: '@bingadir', message: 'Mazeltov', liked: false, id: this.ctr});
    }
    return tweets;
  }
}
