import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.page.html',
  styleUrls: ['./home-screen.page.scss'],
})
export class HomeScreenPage implements OnInit {

  @Input() imagePath: string | undefined; // imagem modificavel
  @Input() userName: string | undefined; // imagem modificavel
  @Input() greeting: string | undefined; // imagem modificavel

  constructor() { }

  ngOnInit() {
  }

}
