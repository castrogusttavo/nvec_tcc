import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card-user-community',
  templateUrl: './card-user-community.component.html',
  styleUrls: ['./card-user-community.component.scss'],
})
export class CardUserCommunityComponent  implements OnInit {

  @Input() greeting: string | undefined;
  @Input() userName: string | undefined;
  @Input() imagePath: string | undefined;
  @Input() numCreatedCommunity: string | undefined;
  @Input() numEnteredCommunity: string | undefined;
  @Input() numInvitesCommunity: string | undefined;
  @Input() state: string | undefined;
  constructor() { }

  ngOnInit() {}

}
