import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
<<<<<<< Updated upstream
=======
  },
  {
    path: 'login-account',
    loadChildren: () => import('./login-account/login-account.module').then( m => m.LoginAccountPageModule)
  },
  {
    path: 'load-screen1',
    loadChildren: () => import('./load-screen1/load-screen1.module').then( m => m.LoadScreen1PageModule)
  },
  {
    path: 'load-screen2',
    loadChildren: () => import('./load-screen2/load-screen2.module').then( m => m.LoadScreen2PageModule)
  },
  {
    path: 'load-screen3',
    loadChildren: () => import('./load-screen3/load-screen3.module').then( m => m.LoadScreen3PageModule)
  },
  {
    path: 'pre-page',
    loadChildren: () => import('./pre-page/pre-page.module').then( m => m.PrePagePageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
>>>>>>> Stashed changes
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
