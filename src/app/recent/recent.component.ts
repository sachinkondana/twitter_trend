import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { LoaderService } from '../common/loader.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {

  public error = null;
  public tweets = {
    col1:[],
    col2:[],
    col3:[]
  }

  constructor(private http: HttpClient,
    private loader: LoaderService) { }

  ngOnInit() {
    // AOS.init();
    this.getTweets();
  }

  private getTweets(){
    this.loader.startLoading();
    this.error = null;
    this.http.get(environment.api+'get-tweets1.1.mock.php')
      .subscribe(
        res => {
          this.loader.completeLoading();
          if(res && res[0]){
            this.formateModelData(res[0].trends);
          }
          else{
            this.error = "Error occured";
          }
        },
        err => {
          this.loader.stopLoading();
          // console.log("Error occured");
          this.error = "Error occured";
        }
      );
  }

  private formateModelData(iData){
    for(let i=0, n= iData.length; i< n; i++){
      let pos = (i%3)+1,
      len = this.tweets['col'+pos].length;
      this.tweets['col'+pos].push(iData[i]);
      // if(i<10)
      this.fetchProfileDetails(this.tweets['col'+pos][len]);
    }
  }

  private fetchProfileDetails(iObj){
    let query = iObj.name;
    if( query.charAt( 0 ) === '0' )
    query = query.slice( 1 );
    if(query){
      this.http.get(environment.api+'get-tweets1.2.mock.php?q='+query)
      .subscribe(
        res => {
          if(res && res.hasOwnProperty("statuses")){
            let userDt = res['statuses'][0];
            iObj['profilepic'] = userDt['user']['profile_image_url'];
            iObj['tweetpic'] = userDt['user']['profile_banner_url'];
            iObj['source'] = userDt['source'];
            iObj['category'] = iObj['name'];
          }
        },
        err => {
          console.log("Error occured");
        }
      );
    }
  }

}
