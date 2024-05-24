import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-community-lists-sobre',
  templateUrl: './community-lists-sobre.page.html',
  styleUrls: ['./community-lists-sobre.page.scss'],
})
export class CommunityListsSobrePage implements OnInit {

  constructor() { }
  public segmentValue: string = 'segment'; 

  @Input() userName!:string;
  @Input() listAddress!:string;
  @Input() totalList!:string;
  @Input() usersName!:string;
  @Input() creatorName!:string;
  @Input() description!:string;
  @Input() category!:string;
  @Input() communityName!:string;
  
  segmentChanged(event: any){
    console.log("Segment changed:", event.detail.value);
    this.segmentValue = event.detail.value;
  }

  ngOnInit() {
  }

}
