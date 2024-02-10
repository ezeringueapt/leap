import { Component } from '@angular/core';
import { UNLOCK, UnlocksService } from '../unlocks.service';

@Component({
  selector: 'app-gale-page',
  templateUrl: './gale-page.component.html',
  styleUrls: ['./gale-page.component.scss'],
})
export class GalePageComponent {
  constructor(public unlocksService: UnlocksService) {}

  isGaleUnlocked() {
    return this.unlocksService.isUnlocked(UNLOCK.GALE);
  }
}
