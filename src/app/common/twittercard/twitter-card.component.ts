import { Component, Input, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'twitter-card',
  templateUrl: './twitter-card.component.html',
  styleUrls: ['./twitter-card.component.scss']
})
export class TwitterCardComponent implements OnInit{

  @Input() tweet: {
    name: string,
    tweetpic: string,
    profilepic:string,
    query:string
  }[] = [];

  ngOnInit() {
    AOS.init();
  }

  public decodeData(iStr):string{
    let rt:any = decodeURIComponent(iStr);
    rt = rt.replace(new RegExp(" ", 'g'), " </i>");    
    rt = rt.replace(new RegExp("#", 'g'), "<i class='blue'>#");
    return rt;
  }
}