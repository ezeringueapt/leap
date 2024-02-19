import { Injectable } from '@angular/core';
import { Imp, Monster } from './monsters';
import { PlayerService } from './player.service';

interface ENCOUNTER_TABLE {
  [n: number]: Monster[];
}

@Injectable({
  providedIn: 'root',
})
export class EncounterTableService {
  constructor(private playerService: PlayerService) {}

  encounterTable: ENCOUNTER_TABLE = {
    1: [new Imp(this.playerService)],
    2: [new Imp(this.playerService), new Imp(this.playerService)],
    3: [
      new Imp(this.playerService),
      new Imp(this.playerService),
      new Imp(this.playerService),
    ],
  };
}
