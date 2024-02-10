import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnlocksService, UNLOCK } from '../unlocks.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-unlock-page',
  templateUrl: './unlock-page.component.html',
  styleUrls: ['./unlock-page.component.scss'],
})
export class UnlockPageComponent {
  constructor(
    route: ActivatedRoute,
    router: Router,
    unlocksService: UnlocksService
  ) {
    const value: UNLOCK = route.snapshot.queryParams['thingtounlock'];
    if (value) {
      unlocksService.unlock(value);
    }
    router.navigateByUrl(this.placeToGoToMap[value]);
  }

  placeToGoToMap = {
    [UNLOCK.GALE]: 'gale-page',
    [UNLOCK.MUSHROOM]: 'heal-page',
    [UNLOCK.CHAMOMILE]: 'heal-page',
    [UNLOCK.GINGERROOT]: 'heal-page',
    [UNLOCK.LAVENDER]: 'heal-page',
    [UNLOCK.BLUESTONE]: 'minimize-page',
    [UNLOCK.EATINGPLANT]: 'minimize-page',
    [UNLOCK.RAINBOWFISH]: 'minimize-page',
    [UNLOCK.HEAL]: '',
  };
}
