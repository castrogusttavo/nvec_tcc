import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-community-screen',
  templateUrl: './community-screen.page.html',
  styleUrls: ['./community-screen.page.scss'],
})
export class CommunityScreenPage implements OnInit {

  constructor(private http:HttpClient) { }

  communities!:any[];

  private apiCommunity = "http://localhost:3001/api/communities";

  getCommunities():Observable<any[]>{
    return this.http.get<any[]>(this.apiCommunity);
  }  

  ngOnInit() {
    this.getCommunities().subscribe(communities=>{
      this.communities=communities;
    })
  }

}
