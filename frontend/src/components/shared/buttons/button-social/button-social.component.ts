import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-social',
  templateUrl: './button-social.component.html',
  styleUrls: ['./button-social.component.scss'],
})
export class ButtonSocialComponent  implements OnInit {

  @Input() imageSocial: string | undefined;
  @Input() texto: string | undefined;


  constructor() { }

  ngOnInit() {}

}
