import { Component } from '@angular/core';
import { UnlocksService } from '../unlocks.service';
import { Unlockables } from '../spells';

@Component({
  selector: 'app-heal-page',
  templateUrl: './heal-page.component.html',
  styleUrls: ['./heal-page.component.scss'],
})
export class HealComponent {
  constructor(public unlocksService: UnlocksService) {}

  isMushroomUnlocked() {
    return this.unlocksService.isUnlocked(Unlockables.Mushroom);
  }

  isGingerRootUnlocked() {
    return this.unlocksService.isUnlocked(Unlockables.GingerRoot);
  }

  isChamomileUnlocked() {
    return this.unlocksService.isUnlocked(Unlockables.Chamomile);
  }

  isLavenderUnlocked() {
    return this.unlocksService.isUnlocked(Unlockables.Lavender);
  }

  shouldChangeLayout() {
    return this.unlocksService.isUnlocked(Unlockables.Heal);
  }
}
