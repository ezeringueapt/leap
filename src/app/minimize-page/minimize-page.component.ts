import { Component } from '@angular/core';
import { UNLOCK, UnlocksService } from '../unlocks.service';

@Component({
  selector: 'app-minimize-page',
  templateUrl: './minimize-page.component.html',
  styleUrls: ['./minimize-page.component.scss'],
})
export class MinimizePageComponent {
  constructor(public unlocksService: UnlocksService) {}
  isBlueStoneUnlocked() {
    return this.unlocksService.isUnlocked(UNLOCK.BLUESTONE);
  }

  isEatingPlantUnlocked() {
    return this.unlocksService.isUnlocked(UNLOCK.EATINGPLANT);
  }

  isRainbowFishUnlocked() {
    return this.unlocksService.isUnlocked(UNLOCK.RAINBOWFISH);
  }
}
