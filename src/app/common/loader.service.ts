import { Injectable } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Injectable()
export class LoaderService {

  constructor(private slimLoadingBarService: SlimLoadingBarService) { }

  startLoading() {
      this.slimLoadingBarService.start(() => {
          console.log('Loading complete');
      });
  }

  stopLoading() {
      this.slimLoadingBarService.stop();
  }

  completeLoading() {
      this.slimLoadingBarService.complete();
  }
}