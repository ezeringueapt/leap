import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-combat-page',
  templateUrl: './combat-page.component.html',
  styleUrls: ['./combat-page.component.scss'],
})
export class CombatPageComponent {
  constructor(private router: Router) {}

  allMonstersDefeated = false;

  confirmRun() {
    const result = confirm('Do you wish to run?');
    if (result == true) {
      this.router.navigateByUrl('');
    } else {
    }
  }
  attack(monsterIndex: number) {
    const monster = this.monsters[monsterIndex];

    monster.monsterHp = monster.monsterHp - this.playerDamage;

    if (monster.monsterHp <= 0) {
      monster.monsterDefeated = true;
    } else {
      this.playerHp -= monster.damage;
      if (this.playerHp <= 0) {
        this.playerDefeated = true;
      }
    }

    this.allMonstersDefeated = this.monsters.reduce(
      (isDefeated, monster) => isDefeated && monster.monsterDefeated,
      true
    );
  }
  monsters = [
    { type: 'imps', monsterHp: 8, monsterDefeated: false, damage: 5 },
    { type: 'slime', monsterHp: 7, monsterDefeated: false, damage: 9 },
    { type: 'skeleton', monsterHp: 14, monsterDefeated: false, damage: 15 },
    { type: 'scorpion', monsterHp: 18, monsterDefeated: false, damage: 20 },
    { type: 'dragon', monsterHp: 30, monsterDefeated: false, damage: 28 },
  ];
  playerDamage = 50987;
  playerHp = 40;
  playerDefeated = false;
}
