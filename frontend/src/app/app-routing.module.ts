import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./splash-screen/splash-screen.module').then(m => m.SplashScreenPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
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
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'create-item',
    loadChildren: () => import('./create-item/create-item.module').then( m => m.CreateItemPageModule)
  },
  {
    path: 'lists-screen',
    loadChildren: () => import('./lists-screen/lists-screen.module').then( m => m.ListsScreenPageModule)
  },
  {
    path: 'community-screen',
    loadChildren: () => import('./community-screen/community-screen.module').then( m => m.CommunityScreenPageModule)
  },
  {
    path: 'create-comunnity',
    loadChildren: () => import('./create-comunnity/create-comunnity.module').then( m => m.CreateComunnityPageModule)
  },
  {
    path: 'plans-screen',
    loadChildren: () => import('./plans-screen/plans-screen.module').then( m => m.PlansScreenPageModule)
  },
  {
    path: 'community-screen',
    loadChildren: () => import('./community-screen/community-screen.module').then( m => m.CommunityScreenPageModule)
  },
  {
    path: 'create-comunnity',
    loadChildren: () => import('./create-comunnity/create-comunnity.module').then( m => m.CreateComunnityPageModule)
  },
  {
    path: 'lists-itens-screen',
    loadChildren: () => import('./lists-itens-screen/lists-itens-screen.module').then( m => m.ListsItensScreenPageModule)
  },
  {
    path: 'acount',
    loadChildren: () => import('./acount/acount.module').then( m => m.AcountPageModule)
  },
  {
    path: 'teste-modal',
    loadChildren: () => import('./teste-modal/teste-modal.module').then( m => m.TesteModalPageModule)
  },
  {
    path: 'explore-container',
    loadChildren: () => import('./explore-container/explore-container.module').then( m => m.ExploreContainerComponentModule)
  },
  {
    path: 'comparation-item-screen',
    loadChildren: () => import('./comparation-item-screen/comparation-item-screen.module').then( m => m.ComparationItemScreenPageModule)
  },
  {
    path: 'all-community-screen',
    loadChildren: () => import('./all-community-screen/all-community-screen.module').then( m => m.AllCommunityScreenPageModule)
  },
  {
    path: 'preferences',
    loadChildren: () => import('./preferences/preferences.module').then( m => m.PreferencesPageModule)
  },
  {
    path: 'new-password',
    loadChildren: () => import('./new-password/new-password.module').then( m => m.NewPasswordPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'ajuda',
    loadChildren: () => import('./ajuda/ajuda.module').then( m => m.AjudaPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'regulamentation',
    loadChildren: () => import('./regulamentation/regulamentation.module').then( m => m.RegulamentationPageModule)
  },
  {
    path: 'cookies-policy',
    loadChildren: () => import('./cookies-policy/cookies-policy.module').then( m => m.CookiesPolicyPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'update-item',
    loadChildren: () => import('./update-item/update-item.module').then( m => m.UpdateItemPageModule)
  },
  {
    path: 'tes-toast',
    loadChildren: () => import('./tes-toast/tes-toast.module').then( m => m.TesToastPageModule)
  },
  {
    path: 'comunnity-lists-item',
    loadChildren: () => import('./comunnity-lists-item/comunnity-lists-item.module').then( m => m.ComunnityListsItemPageModule)
  },
  { path: 'community-lists-sobre',
    loadChildren: () => import('./community-lists-sobre/community-lists-sobre.module').then( m => m.CommunityListsSobrePageModule)
  },  {
    path: 'teste-senha',
    loadChildren: () => import('./teste-senha/teste-senha.module').then( m => m.TesteSenhaPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
