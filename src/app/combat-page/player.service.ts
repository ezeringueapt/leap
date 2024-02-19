import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  damage = 30;
  maxHp = 40;
  hp = this.maxHp;

  reset() {
    this.hp = this.maxHp;
  }

  levelUp() {
    this.maxHp += 3;
    this.damage += 3;
  }
}
