import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private splashScreen: SplashScreenPage) {
    this.initialization();
  }

  initializeApp() {
    this.splashScreen.show();
    // Lógica de inicialização do aplicativo
    // Por exemplo, carregar dados, inicializar plugins, etc.
    // Depois que tudo estiver pronto, você pode esconder a splash-screen
    setTimeout(() => {
      this.splashScreen.hide();
    }, 3000); // Tempo em milissegundos para exibir a splash-screen
  }
}
