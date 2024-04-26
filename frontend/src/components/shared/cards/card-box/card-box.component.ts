import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.scss'],
})
export class CardBoxComponent  implements OnInit {

  @Input() action:string|undefined
  @Input() description:string|undefined
  @Input() image:string|undefined
  
  constructor(private router:Router) { }

  navigateTo(){
    this.router.navigate(['/home-screen'])
  }

  ngOnInit() {}

}
