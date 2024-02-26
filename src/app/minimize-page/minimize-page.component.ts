import { Component } from '@angular/core';
import { UnlocksService } from '../unlocks.service';
import { Unlockables } from '../spells';

@Component({
  selector: 'app-minimize-page',
  templateUrl: './minimize-page.component.html',
  styleUrls: ['./minimize-page.component.scss'],
})
export class MinimizePageComponent {
  constructor(public unlocksService: UnlocksService) {}
  isBlueStoneUnlocked() {
    return this.unlocksService.isUnlocked(Unlockables.BlueStone);
  }

  isEatingPlantUnlocked() {
    return this.unlocksService.isUnlocked(Unlockables.EatingPlant);
  }

  isRainbowFishUnlocked() {
    return this.unlocksService.isUnlocked(Unlockables.RainbowFish);
  }

  shouldChangeLayout() {
    return (
      this.isBlueStoneUnlocked() &&
      this.isEatingPlantUnlocked() &&
      this.isRainbowFishUnlocked()
    );
  }
}
