import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LearnFireballComponent } from './learn-fireball/learn-fireball.component';
import { HealComponent } from './heal-page/heal-page.component';
import { UnlockPageComponent } from './unlock-page/unlock-page.component';
import { GalePageComponent } from './gale-page/gale-page.component';
import { MinimizePageComponent } from './minimize-page/minimize-page.component';
import { CombatPageComponent } from './combat-page/combat-page.component';

export enum Pages {
  Heal = 'heal-page',
  Unlock = 'unlock-page',
  LearnFireball = 'learn-fireball',
  Gale = 'gale-page',
  Home = '',
  Minimize = 'minimize-page',
  Combat = 'combat-page',
}

const routes: Routes = [
  { path: Pages.Unlock, component: UnlockPageComponent },
  { path: Pages.LearnFireball, component: LearnFireballComponent },
  { path: Pages.Heal, component: HealComponent },
  { path: Pages.Gale, component: GalePageComponent },
  { path: Pages.Minimize, component: MinimizePageComponent },
  { path: Pages.Combat, component: CombatPageComponent },
  { path: Pages.Home, component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
