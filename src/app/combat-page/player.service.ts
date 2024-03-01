import { Injectable } from '@angular/core';
import { Monster } from './monsters';
import { CombatLogService } from './combat-log.service';
import { getRandomNumberArbitrary } from '../utils/get-random-number-arbitrary';

type PlayerStatuses = 'stoneDefence' | 'charged';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private combatLogService: CombatLogService) {}
  level = +(localStorage.getItem('playerLevel') || '1');
  damage = this.level * 3 + 2;
  maxHp = this.level * 10 + 40;
  maxMp = this.level * 3 + 12;
  hp = this.maxHp;
  mp = this.maxMp;
  statuses: PlayerStatuses[] = [];

  reset() {
    this.hp = this.maxHp;
    this.mp = this.maxMp;
    this.statuses = [];
  }

  levelUp() {
    this.level++;
    localStorage.setItem('playerLevel', this.level.toString());

    this.maxHp += 10;
    this.damage += 3;
    this.maxMp += 3;
  }

  setLevel(level: number) {
    this.level = level;
    this.damage = this.level * 3 + 2;
    this.maxHp = this.level * 10 + 40;
    this.maxMp = this.level * 3 + 12;
    this.hp = this.maxHp;
    this.mp = this.maxMp;
  }

  takeDamage(ammountOfDamage: number, attackingMonster: Monster) {
    if (this.statuses.includes('stoneDefence')) {
      ammountOfDamage = Math.floor(ammountOfDamage * 0.5);
    }
    if (
      attackingMonster.statuses.includes('blinded') &&
      getRandomNumberArbitrary(0, 100) < 30
    ) {
      this.combatLogService.addLine(
        `${attackingMonster.name} misses because its blinded`
      );
      return 0;
    }
    this.hp -= ammountOfDamage;
    return ammountOfDamage;
  }

  giveStatus(status: PlayerStatuses) {
    this.statuses.push(status);
  }

  removeStatus(status: PlayerStatuses) {
    const index = this.statuses.indexOf(status);
    if (index > -1) {
      this.statuses.splice(index, 1);
    }
  }
}
