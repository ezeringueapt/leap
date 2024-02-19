import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from './player.service';
import { Monster } from './monsters';
import { EncounterTableService } from './encounter-table';
import { Pages } from '../app-routing.module';
import { UnlocksService } from '../unlocks.service';
import { Unlockables } from '../spells';

@Component({
  selector: 'app-combat-page',
  templateUrl: './combat-page.component.html',
  styleUrls: ['./combat-page.component.scss'],
})
export class CombatPageComponent {
  constructor(
    private router: Router,
    public player: PlayerService,
    private activatedRoute: ActivatedRoute,
    private encounterTableService: EncounterTableService,
    public unlocksService: UnlocksService
  ) {
    this.player.reset();
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      const encounterNumber = queryParams['encounter'];
      if (encounterNumber === undefined) {
        this.gameState = 'error';
        throw new Error('No Envounter Error');
      }
      this.monsters =
        this.encounterTableService.encounterTable[encounterNumber];
      this.gameState = 'fighting';
    });
  }

  gameState: GameState = 'loading';
  selectedActon: 'attack' | 'spell' = 'attack';
  selectedSpell?: Unlockables.Spell =
    this.unlocksService.getUnlockedSpells()[0];
  monsters: Monster[] = [];
  combatLog: string[] = [];

  attackAction(monsterIndex: number) {
    const monster = this.monsters[monsterIndex];

    if (this.selectedActon === 'attack') {
      monster.hp = monster.hp - this.player.damage;
      this.combatLog.push(
        `You deal ${this.player.damage} damage to ${monster.name}`
      );
    }
    if (this.selectedActon === 'spell' && this.selectedSpell) {
      const log = this.selectedSpell.action(monster);
      this.combatLog.push(log);
    }

    this.postActionPhase();
  }

  private postActionPhase() {
    this.monsters.forEach((monster) => {
      if (!monster.isDefeated()) {
        const log = monster.takeAction();
        this.combatLog.push(log);
      }
    });

    if (this.player.hp <= 0) {
      this.gameState = 'lost';
    }

    const allMonstersDefeated = this.monsters.reduce(
      (isDefeated, monster) => isDefeated && monster.isDefeated(),
      true
    );

    if (allMonstersDefeated) {
      this.player.levelUp();
      this.gameState = 'win';
    }
  }

  attackBtn() {
    this.selectedActon = 'attack';
  }

  spellBtn() {
    this.selectedActon = 'spell';
    // TODO: spell selection
    this.gameState = 'selectingSpell';
  }

  confirmRun() {
    const result = confirm('Do you wish to run?');
    if (result == true) {
      this.router.navigateByUrl(Pages.Home);
    } else {
    }
  }

  selectSpell(spell: Unlockables.Spell) {
    this.selectedSpell = spell;
    this.gameState = 'fighting';
  }
}

type GameState =
  | 'fighting'
  | 'lost'
  | 'win'
  | 'loading'
  | 'error'
  | 'selectingSpell';
