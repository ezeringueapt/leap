import { Injectable } from '@angular/core';
import {
  DemonLord,
  Dragon,
  Firebird,
  Golem,
  Icebird,
  Imp,
  King,
  Monster,
  Queen,
  Scorpion,
  Skeleton,
  Slime,
} from './monsters';
import { PlayerService } from './player.service';
import { UnlocksService } from '../unlocks.service';
import { getRandomNumberArbitrary } from '../utils/get-random-number-arbitrary';

@Injectable({
  providedIn: 'root',
})
export class EncounterTableService {
  constructor(
    private playerService: PlayerService,
    private unlocksService: UnlocksService
  ) {}

  getEncounter(encounterNumber: number) {
    const possibleEncounters: Monster[][] =
      this.getPossibleEncounters(encounterNumber);

    const encounterTodo = Math.round(
      getRandomNumberArbitrary(0, possibleEncounters.length - 1)
    );

    return possibleEncounters[encounterTodo];
  }

  private getPossibleEncounters(encounterNumber: number): Monster[][] {
    switch (encounterNumber) {
      case 1:
        return [[this.imp(), this.imp(), this.imp()]];
      case 2:
        return [
          [this.imp(), this.imp(), this.imp()],
          [this.slime(), this.slime()],
        ];
      case 3:
        return [
          [this.slime(), this.slime()],
          [this.skeleton(), this.skeleton()],
        ];
      case 4:
        return [
          [this.slime(), this.slime(), this.slime()],
          [this.skeleton(), this.skeleton(), this.skeleton()],
        ];
      case 5:
        return [
          [this.slime(), this.slime(), this.slime()],
          [this.skeleton(), this.skeleton(), this.skeleton()],
          [this.scorpion()],
        ];
      case 6:
        return [
          [this.slime(), this.slime(), this.slime()],
          [this.skeleton(), this.skeleton(), this.skeleton()],
          [this.scorpion()],
        ];
      case 7:
        return [
          [this.slime(), this.slime(), this.slime()],
          [this.skeleton(), this.skeleton(), this.skeleton()],
          [this.scorpion(), this.scorpion()],
        ];
      case 8:
        return [
          [this.slime(), this.slime(), this.slime()],
          [this.skeleton(), this.skeleton(), this.skeleton()],
          [this.scorpion(), this.scorpion()],
          [this.dragon()],
        ];
      case 9:
        return [
          [this.skeleton(), this.skeleton(), this.skeleton()],
          [this.scorpion(), this.scorpion(), this.scorpion()],
          [this.dragon()],
        ];

      case 89:
        return [[new Golem(this.playerService, this.unlocksService)]];
      case 404:
        return [[new King(this.playerService, this.unlocksService)]];
      case 99:
        return [
          [
            new Firebird(this.playerService, this.unlocksService),
            new Icebird(this.playerService, this.unlocksService),
          ],
        ];
      case 100:
        return [[new Queen(this.playerService, this.unlocksService)]];
      case 999:
        return [[new DemonLord(this.playerService, this.unlocksService)]];
      default:
        throw new Error('No Encounter Found for that number');
    }
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

  scorpion() {
    return new Scorpion(this.playerService, this.unlocksService);
  }

  dragon() {
    return new Dragon(this.playerService, this.unlocksService);
  }
}
