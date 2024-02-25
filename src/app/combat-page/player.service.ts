import { Injectable } from '@angular/core';

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

  reset() {
    this.hp = this.maxHp;
    this.mp = this.maxMp;
  }

  levelUp() {
    this.level++;
    localStorage.setItem('playerLevel', this.level.toString());

    this.maxHp += 3;
    this.damage += 3;
  }
}
