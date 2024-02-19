import { Component } from '@angular/core';
import { UnlocksService } from '../unlocks.service';
import { Unlockables } from '../spells';

@Component({
  selector: 'app-gale-page',
  templateUrl: './gale-page.component.html',
  styleUrls: ['./gale-page.component.scss'],
})
export class GalePageComponent {
  constructor(public unlocksService: UnlocksService) {}

  isGaleUnlocked() {
    return this.unlocksService.isUnlocked(Unlockables.Gale);
  }
}
