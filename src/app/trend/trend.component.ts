import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { LoaderService } from '../common/loader.service';
import { DataService } from "../common/data.service";

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnInit {

  public error = null;
  public tweets = null;

  constructor(private http: HttpClient,
    private loader: LoaderService,
    private data: DataService) { }

  ngOnInit() {
    // AOS.init();
    this.getTweets("get-tweets1.3.php", false);
    this.initSearchListener();
  }

  private initTweetModel(){
    this.tweets = {
      col1:[],
      col2:[],
      col3:[]
    };
  }

  private initSearchListener(){
    this.data.currentData.subscribe(query => {
      if(typeof query === 'string')
        this.searchTweets(query);
    });
  }

  private getTweets(iAPI, iFromSearch){
    this.initTweetModel();

    this.loader.startLoading();
    this.error = null;
    this.http.get(environment.api+iAPI)
      .subscribe(
        res => {
          this.loader.completeLoading();
          if(res){
            let response = (iFromSearch)?res['statuses']:res;
            this.formateModelData(response);
          }
          else{
            this.error = "Currently no tweets available.";
          }
        },
        err => {
          this.loader.stopLoading();
          // console.log("Error occured");
          this.error = "Error occured while retrieving tweets";
        }
      );
  }

  private getExtendedContents(iExData){
    return (iExData && iExData.media && iExData.media.length)?iExData.media[0]:{}
  }

  private getTweetModel(iData){
    let user = iData.user,
    extContent = this.getExtendedContents(iData.extended_entities);

    return {
      "category": iData.source,
      "name": user.name,
      "tweetpic":extContent.media_url,
      "profilepic":user.profile_image_url,
      "query":iData.text
    };
  }

  private formateModelData(iData){
    for(let i=0, n= iData.length; i< n; i++){
      let pos = (i%3)+1,
      len = this.tweets['col'+pos].length,
      tweetObj = this.getTweetModel(iData[i]);
      this.tweets['col'+pos].push(tweetObj);
    }
  }

  private searchTweets(iQuery){
    if(iQuery)
    {
      this.getTweets("get-tweets1.4.php?q="+iQuery, true);
    }
    else{
      this.getTweets("get-tweets1.3.php", false);
    }
  }
}
