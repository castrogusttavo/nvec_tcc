import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})

export class ReportPage implements OnInit {
  public segmentValue: string = 'segment';

  segmentChanged(event: any){
    console.log("Segment changed:", event.detail.value);
    this.segmentValue = event.detail.value;
  }


  ngOnInit() {

  }

}
