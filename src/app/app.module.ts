import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppContainer} from './containers/app/app.container';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {TopbarComponent} from './components/topbar/topbar.component';
import {FormsModule} from '@angular/forms';
import {TweetsComponent} from './components/tweets/tweets.component';
import {NgxsModule} from '@ngxs/store';
import {TweetState} from '../state-management/tweet/state';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [
    AppContainer,
    SidebarComponent,
    TopbarComponent,
    TweetsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxsModule.forRoot([TweetState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppContainer]
})
export class AppModule {
}
