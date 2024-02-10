import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HealComponent } from './heal-page/heal-page.component';
import { LearnFireballComponent } from './learn-fireball/learn-fireball.component';
import { UnlockPageComponent } from './unlock-page/unlock-page.component';
import { SpellButtonComponent } from './spell-button/spell-button.component';
import { GalePageComponent } from './gale-page/gale-page.component';
import { MinimizePageComponent } from './minimize-page/minimize-page.component';
import { CombatPageComponent } from './combat-page/combat-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HealComponent,
    LearnFireballComponent,
    UnlockPageComponent,
    SpellButtonComponent,
    GalePageComponent,
    MinimizePageComponent,
    CombatPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
