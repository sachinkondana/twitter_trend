import { Component } from '@angular/core';
import { DataService } from "./common/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[DataService]
})
export class AppComponent {
  public searchkey;

  constructor(private data: DataService){}

  serachTweet(){
    this.data.updateData(this.searchkey);
  }
}
