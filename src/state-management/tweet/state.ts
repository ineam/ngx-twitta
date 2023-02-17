import {Action, State, StateContext} from '@ngxs/store';
import {Tweet} from '../../app/types/tweet.type';
import {Injectable} from '@angular/core';
import {TweetActions} from './actions';
import FetchAll = TweetActions.FetchAll;
import DeleteTweet = TweetActions.DeleteTweet;
import AddTweet = TweetActions.AddTweet;
import ToggleLike = TweetActions.ToggleLike;

@State<Tweet[]>({
  name: 'tweets',
  defaults: []
})
@Injectable()
export class TweetState {
  @Action(FetchAll)
  getTweets({setState}: StateContext<Tweet[]>, action: FetchAll): void {
    setState([...action.tweets]);
  }

  @Action(DeleteTweet)
  deleteTweet({setState, getState}: StateContext<Tweet[]>, action: DeleteTweet): void {
    setState([...getState().filter(tweet => tweet.id !== action.tweetId)]);
  }

  @Action(AddTweet)
  addTweet({setState, getState}: StateContext<Tweet[]>, action: AddTweet): void {
    setState([...getState(), action.tweet]);
  }

  @Action(ToggleLike)
  toggleTweet({setState, getState}: StateContext<Tweet[]>, action: ToggleLike): void {
    setState([...getState().map(tweet => tweet.id === action.tweetId ?
      {...tweet, liked: !tweet.liked} : tweet
    )]);
  }
}
