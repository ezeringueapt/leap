import { Injectable } from '@angular/core';
import { FireWitch, IceWitch, Imp, Monster, Skeleton, Slime } from './monsters';
import { PlayerService } from './player.service';
import { UnlocksService } from '../unlocks.service';

@Injectable({
  providedIn: 'root',
})
export class EncounterTableService {
  constructor(
    private playerService: PlayerService,
    private unlocksService: UnlocksService
  ) {}

  getEncounter(encounterNumber: number) {
    switch (encounterNumber) {
      case 1:
        return [this.imp(), this.imp()];
      case 2:
        return [this.slime(), this.slime()];
      case 3:
        return [this.skeleton(), this.skeleton()];
      case 99:
        return [
          new FireWitch(this.playerService, this.unlocksService),
          new IceWitch(this.playerService, this.unlocksService),
        ];
    }
    throw new Error('No Encounter Found for that number');
  }

  imp() {
    return new Imp(this.playerService, this.unlocksService);
  }

  slime() {
    return new Slime(this.playerService, this.unlocksService);
  }

  skeleton() {
    return new Skeleton(this.playerService, this.unlocksService);
  }
}
