import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

import { LoaderService } from './common/loader.service';
import { TwitterCardComponent } from './common/twittercard/twitter-card.component';

import { AppComponent } from './app.component';
import { RecentComponent } from './recent/recent.component';
import { TrendComponent } from './trend/trend.component';

const appRoutes: Routes = [
  { path: 'recent', component: RecentComponent },
  { path: 'trend', component: TrendComponent },
  { path: '',
    redirectTo: '/trend',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RecentComponent,
    TrendComponent,
    TwitterCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SlimLoadingBarModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
