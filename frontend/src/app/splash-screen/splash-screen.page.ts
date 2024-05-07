import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  constructor(
    private navController: NavController,
    private animationController: AnimationController
  ) {}

  ngOnInit() {
    this.animateSplashScreen();
  }

  animateSplashScreen() {
    const splashElement = document.querySelector('.splash-container') as Element;

    // Animação de entrada
    const fadeInAnimation = this.animationController.create()
      .addElement(splashElement)
      .duration(1000) // 1 segundo para entrada suave
      .fromTo('opacity', 0, 1);

    // Animação de saída para transição
    const fadeOutAnimation = this.animationController.create()
      .addElement(splashElement)
      .duration(1000) // 1 segundo para saída suave
      .fromTo('opacity', 1, 0);

    // Sequência de animações com atraso entre elas
    fadeInAnimation.play().then(() => {
      setTimeout(() => {
        fadeOutAnimation.play().then(() => {
          this.navController.navigateRoot('/load-screen1', {
            animated: true,
            animationDirection: 'forward',
          });
        });
      }, 5000);
    });
  }
}
