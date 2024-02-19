import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnlocksService } from '../unlocks.service';

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
    const value: string = route.snapshot.queryParams['thingtounlock'];
    if (value) {
      const unlock = unlocksService.unlock(value);
      return router.navigateByUrl(unlock.placeToGoAfterUnlock);
    }
    router.navigateByUrl('/');
  }
}
