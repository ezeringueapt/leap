import { Injectable } from '@angular/core';

type PlayerStatuses = 'stoneDefence';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  level = +(localStorage.getItem('playerLevel') || '1');
  damage = this.level * 3 + 2;
  maxHp = this.level * 3 + 37;
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

    this.maxHp += 3;
    this.damage += 3;
  }

  takeDamage(ammountOfDamage: number) {
    if (this.statuses.includes('stoneDefence')) {
      ammountOfDamage = Math.floor(ammountOfDamage * 0.8);
    }
    this.hp -= ammountOfDamage;
    return ammountOfDamage;
  }

  giveStatus(status: PlayerStatuses) {
    this.statuses.push(status);
  }
}
