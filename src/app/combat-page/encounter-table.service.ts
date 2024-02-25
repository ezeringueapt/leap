import { Injectable } from '@angular/core';
import { FireWitch, IceWitch, Imp, Monster } from './monsters';
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
        return [new Imp(this.playerService, this.unlocksService)];
      case 2:
        return [
          new Imp(this.playerService, this.unlocksService),
          new Imp(this.playerService, this.unlocksService),
        ];
      case 3:
        return [
          new Imp(this.playerService, this.unlocksService),
          new Imp(this.playerService, this.unlocksService),
          new Imp(this.playerService, this.unlocksService),
        ];
      case 99:
        return [
          new FireWitch(this.playerService, this.unlocksService),
          new IceWitch(this.playerService, this.unlocksService),
        ];
    }
    throw new Error('No Encounter Found for that number');
  }
}
