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
import { CombatLogService } from './combat-log.service';

@Injectable({
  providedIn: 'root',
})
export class EncounterTableService {
  constructor(
    private playerService: PlayerService,
    private unlocksService: UnlocksService,
    private combatLogService: CombatLogService
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
        return [[this.slime(), this.slime(), this.slime()], [this.skeleton()]];
      case 4:
        return [
          [this.slime(), this.skeleton(), this.slime()],
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
          [this.slime(), this.scorpion(), this.slime()],
          [this.skeleton(), this.scorpion(), this.skeleton()],
          [this.dragon()],
        ];
      case 7:
        return [
          [this.slime(), this.scorpion(), this.skeleton()],
          [this.skeleton(), this.skeleton(), this.skeleton()],
          [this.scorpion(), this.scorpion()],
        ];
      case 8:
        return [
          [this.slime(), this.dragon(), this.slime()],
          [this.skeleton(), this.skeleton(), this.skeleton()],
          [this.scorpion(), this.scorpion()],
          [this.dragon()],
        ];
      case 9:
        return [
          [this.skeleton(), this.scorpion(), this.skeleton()],
          [this.scorpion(), this.dragon(), this.scorpion()],
          [this.dragon(), this.dragon()],
        ];

      case 89:
        return [
          [
            new Golem(
              this.playerService,
              this.unlocksService,
              this.combatLogService
            ),
          ],
        ];
      case 404:
        return [
          [
            new King(
              this.playerService,
              this.unlocksService,
              this.combatLogService
            ),
          ],
        ];
      case 99:
        return [
          [
            new Firebird(
              this.playerService,
              this.unlocksService,
              this.combatLogService
            ),
            new Icebird(
              this.playerService,
              this.unlocksService,
              this.combatLogService
            ),
          ],
        ];
      case 100:
        return [
          [
            new Queen(
              this.playerService,
              this.unlocksService,
              this.combatLogService
            ),
          ],
        ];
      case 999:
        return [
          [
            new DemonLord(
              this.playerService,
              this.unlocksService,
              this.combatLogService
            ),
          ],
        ];
      default:
        throw new Error('No Encounter Found for that number');
    }
  }

  imp() {
    return new Imp(
      this.playerService,
      this.unlocksService,
      this.combatLogService
    );
  }

  slime() {
    return new Slime(
      this.playerService,
      this.unlocksService,
      this.combatLogService
    );
  }

  skeleton() {
    return new Skeleton(
      this.playerService,
      this.unlocksService,
      this.combatLogService
    );
  }

  scorpion() {
    return new Scorpion(
      this.playerService,
      this.unlocksService,
      this.combatLogService
    );
  }

  dragon() {
    return new Dragon(
      this.playerService,
      this.unlocksService,
      this.combatLogService
    );
  }
}
