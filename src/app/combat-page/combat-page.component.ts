import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from './player.service';
import { Monster } from './monsters';
import { EncounterTableService } from './encounter-table.service';
import { Pages } from '../app-routing.module';
import { UnlocksService } from '../unlocks.service';
import { Unlockables } from '../spells';
import { CombatLogService } from './combat-log.service';

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
    public unlocksService: UnlocksService,
    public combatLogService: CombatLogService
  ) {
    this.combatLogService.clear();
    this.player.reset();
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      const encounterNumber = queryParams['encounter'];
      if (encounterNumber === undefined) {
        this.gameState = 'error';
        throw new Error('No Envounter Error');
      }
      this.monsters = this.encounterTableService.getEncounter(+encounterNumber);
      this.gameState = 'fighting';
      if (queryParams['playerLevel']) {
        this.player.setLevel(queryParams['playerLevel']);
      }
    });
  }

  gameState: GameState = 'loading';
  selectedActon: 'attack' | 'spell' = 'attack';
  selectedSpell?: Unlockables.Spell =
    this.unlocksService.getUnlockedSpells()[0];
  monsters: Monster[] = [];

  attackAction(monsterIndex: number) {
    const monster = this.monsters[monsterIndex];

    if (this.selectedActon === 'attack') {
      const dmgDealt = monster.takeDamage(this.player.damage);
      this.combatLogService.addLine(
        `You deal ${dmgDealt} damage to ${monster.name}`
      );
    }
    if (this.selectedActon === 'spell' && this.selectedSpell) {
      const log = this.castSpell(monster, this.selectedSpell);
      this.combatLogService.addLine(log);
    }

    this.postActionPhase();
  }

  private postActionPhase() {
    const unfilteredMonsters = this.monsters;
    this.monsters = this.monsters.filter((monster) => !monster.isDefeated());

    this.monsters.forEach((monster) => {
      const log = monster.takeAction(this.monsters);
      this.combatLogService.addLine(log);
    });

    if (this.player.hp <= 0) {
      this.gameState = 'lost';
    }

    if (this.monsters.length === 0) {
      this.player.levelUp();
      this.combatLogService.addLine(
        'You win and level up gaining 10 hp, 3 mp, and 3 attack.'
      );
      this.gameState = 'win';
      unfilteredMonsters.forEach((monster) => monster.reward());
    }
  }

  castSpell(monster: Monster, spell: Unlockables.Spell) {
    if (this.player.mp < spell.mpCost) {
      return `You try to cast ${spell.name}, but you dont have enough mp`;
    }
    this.player.mp -= spell.mpCost;

    return spell.action(monster, this.monsters);
  }

  attackBtn() {
    this.selectedActon = 'attack';
  }

  spellBtn() {
    this.gameState = 'selectingSpell';
  }

  confirmRun() {
    const result = confirm('Do you wish to run?');
    if (result == true) {
      this.router.navigateByUrl(Pages.Home);
    }
  }

  selectSpell(spell: Unlockables.Spell) {
    if (spell.target === 'self' || spell.target === 'all') {
      const log = this.castSpell(this.monsters[0], spell);
      this.combatLogService.addLine(log);
      this.gameState = 'fighting';
      this.postActionPhase();
      return;
    }
    this.selectedSpell = spell;
    this.selectedActon = 'spell';
    this.gameState = 'fighting';
  }

  returnHome() {
    this.router.navigateByUrl('');
  }
}

type GameState =
  | 'fighting'
  | 'lost'
  | 'win'
  | 'loading'
  | 'error'
  | 'selectingSpell';
