import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'game', 
    loadComponent: () => import('../crossword/crossword.component').then( cross => cross.CrosswordComponent)
  },
  {
    path: '**',
    loadComponent: () => import('../homepage/homepage.component').then( home => home.HomepageComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
