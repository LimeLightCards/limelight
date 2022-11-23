import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToProfile = () => redirectLoggedInTo(['profile']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'advanced',
    loadChildren: () => import('./advanced/advanced.module').then( m => m.AdvancedPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'card/:id',
    loadChildren: () => import('./card/card.module').then( m => m.CardPageModule)
  },
  {
    path: 'syntax',
    loadChildren: () => import('./syntax/syntax.module').then( m => m.SyntaxPageModule)
  },
  {
    path: 'randomcard',
    loadChildren: () => import('./randomcard/randomcard.module').then( m => m.RandomcardPageModule)
  },
  {
    path: 'sets',
    loadChildren: () => import('./sets/sets.module').then( m => m.SetsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToProfile }
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./profile-public/profile-public.module').then( m => m.ProfilePublicPageModule)
  },
  {
    path: 'collection',
    loadChildren: () => import('./collection/collection.module').then( m => m.CollectionPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'deck/create',
    loadChildren: () => import('./deck-create/deck-create.module').then( m => m.DeckCreatePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'deck/edit/:id',
    loadChildren: () => import('./deck-create/deck-create.module').then( m => m.DeckCreatePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'deck/view/:id',
    loadChildren: () => import('./deck-view/deck-view.module').then( m => m.DeckViewPageModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
