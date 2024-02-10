import { Component } from '@angular/core';
import { UNLOCK, UnlocksService } from '../unlocks.service';

@Component({
  selector: 'app-heal-page',
  templateUrl: './heal-page.component.html',
  styleUrls: ['./heal-page.component.scss'],
})
export class HealComponent {
  constructor(public unlocksService: UnlocksService) {}

  isMushroomUnlocked() {
    return this.unlocksService.isUnlocked(UNLOCK.MUSHROOM);
  }

  isGingerRootUnlocked() {
    return this.unlocksService.isUnlocked(UNLOCK.GINGERROOT);
  }

  isChamomileUnlocked() {
    return this.unlocksService.isUnlocked(UNLOCK.CHAMOMILE);
  }

  isLavenderUnlocked() {
    return this.unlocksService.isUnlocked(UNLOCK.LAVENDER);
  }

  shouldChangeLayout() {
    return this.unlocksService.isHealUnlocked();
  }
}
