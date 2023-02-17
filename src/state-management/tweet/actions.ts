import {Tweet} from '../../app/types/tweet.type';

export namespace TweetActions {
  export class FetchAll {
    static readonly type = '[Tweet] Get Tweets';

    constructor(public tweets: Tweet[]) {
    }
  }

  export class AddTweet {
    static readonly type = '[Tweet] Add Tweet';

    constructor(public tweet: Tweet) {
    }
  }

  export class DeleteTweet {
    static readonly type = '[Tweet] Remove tweet';

    constructor(public tweetId: number) {
    }
  }

  export class ToggleLike {
    static readonly type = '[Tweet] Toggle Like';

    constructor(public tweetId: number) {
    }
  }
}
