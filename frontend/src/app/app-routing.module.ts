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
    path: 'create-item/:id',
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
    path: 'lists-items/:id',
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
    path: 'update-item/:idList/:idItem',
    loadChildren: () => import('./update-item/update-item.module').then( m => m.UpdateItemPageModule)
  },
  {
    path: 'tes-toast',
    loadChildren: () => import('./tes-toast/tes-toast.module').then( m => m.TesToastPageModule)
  },
  {
    path: 'comunnity-lists-item/:userId/:communityId/:listId',
    loadChildren: () => import('./comunnity-lists-item/comunnity-lists-item.module').then( m => m.ComunnityListsItemPageModule)
  },
  { path: 'community-lists-sobre/:communityId',
    loadChildren: () => import('./community-lists-sobre/community-lists-sobre.module').then( m => m.CommunityListsSobrePageModule)
  },
  {
    path: 'teste-senha',
    loadChildren: () => import('./teste-senha/teste-senha.module').then( m => m.TesteSenhaPageModule)
  },
  {
    path: 'update-community/:userId/:communityId',
    loadChildren: () => import('./update-comunnity/update-comunnity.module').then( m => m.UpdateComunnityPageModule)
  },
  {
    path: 'create-item-comunnity/:userId/:communityId',
    loadChildren: () => import('./create-item-comunnity/create-item-comunnity.module').then( m => m.CreateItemComunnityPageModule)
  },
  {
    path: 'update-item-comunnity/:userId/:communityId/:listId',
    loadChildren: () => import('./update-item-comunnity/update-item-comunnity.module').then( m => m.UpdateItemComunnityPageModule)
  },
  {
    path: 'update-item-user/:userId/:communityId/:listId/:itemId',
    loadChildren: () => import('./update-item-user/update-item-user.module').then( m => m.UpdateItemUserPageModule)
  },
  {
    path: 'update-list/:id',
    loadChildren: () => import('./update-list/update-list.module').then( m => m.UpdateListPageModule)
  },
  {
    path: 'select-item/:idList/:idItem',
    loadChildren: () => import('./select-item/select-item.module').then( m => m.SelectItemPageModule)
  },
  {
    path: 'report-css',
    loadChildren: () => import('./report-css/report-css.module').then( m => m.ReportCssPageModule)
  },
  {
    path: 'list-adm-community/:userId/:communityId',
    loadChildren: () => import('./list-adm-community/list-adm-community.module').then( m => m.ListAdmCommunityPageModule)
  },
  {
    path: 'community-lists-sobre/:userId/:communityId',
    loadChildren: () => import('./community-lists-sobre/community-lists-sobre.module').then( m => m.CommunityListsSobrePageModule)
  },
  {
    path: 'load-screen-community',
    loadChildren: () => import('./load-screen-community/load-screen-community.module').then( m => m.LoadScreenCommunityPageModule)
  },
  {
    path: 'load-screen-community-two',
    loadChildren: () => import('./load-screen-community-two/load-screen-community-two.module').then( m => m.LoadScreenCommunityTwoPageModule)
  },
  {
    path: 'list-adm-community',
    loadChildren: () => import('./list-adm-community/list-adm-community.module').then(m => m.ListAdmCommunityPageModule )
  },
  {
    path: 'select-item-community/:userId/:communityId/:itemId',
    loadChildren: () => import('./select-item-community/select-item-community.module').then( m => m.SelectItemCommunityPageModule)
  },
  {
    path: 'update-static-item/:userId/:communityId/:itemId/',
    loadChildren: () => import('./update-static-item/update-static-item.module').then( m => m.UpdateStaticItemPageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
