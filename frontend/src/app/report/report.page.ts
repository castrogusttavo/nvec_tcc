import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})

export class ReportPage implements OnInit {
  segment: string = 'segment';
  secondary: string = 'secondary';
  constructor() { }

  ngOnInit() {
    
  }

}
