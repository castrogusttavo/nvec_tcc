import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})

export class ReportPage implements OnInit {
  public segmentValue: string = 'segment1'; 
  constructor() { }

  segmentChanged(event: any){
    this.segmentValue = event.detail.value;
  }

  ngOnInit() {
    
  }

}
