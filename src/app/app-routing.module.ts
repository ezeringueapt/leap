import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LearnFireballComponent } from './learn-fireball/learn-fireball.component';
import { HealComponent } from './heal-page/heal-page.component';
import { UnlockPageComponent } from './unlock-page/unlock-page.component';
import { GalePageComponent } from './gale-page/gale-page.component';
import { MinimizePageComponent } from './minimize-page/minimize-page.component';
import { CombatPageComponent } from './combat-page/combat-page.component';

const routes: Routes = [
  { path: 'unlock-page', component: UnlockPageComponent },
  { path: 'learnFireball', component: LearnFireballComponent },
  { path: 'heal-page', component: HealComponent },
  { path: 'gale-page', component: GalePageComponent },
  { path: '', component: HomePageComponent },
  { path: 'minimize-page', component: MinimizePageComponent },
  { path: 'combat-page', component: CombatPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
