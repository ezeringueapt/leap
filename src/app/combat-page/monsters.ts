import { UnlocksService } from '../unlocks.service';
import { PlayerService } from './player.service';

export abstract class Monster {
  constructor(
    protected playerService: PlayerService,
    protected unlocksService: UnlocksService
  ) {}
  abstract name: string;
  abstract hp: number;

  abstract takeAction: () => string;
  abstract reward: () => void;

  isDefeated = () => {
    return this.hp <= 0;
  };
}

export class Imp extends Monster {
  name = 'Imp';
  hp = 8;

  takeAction = () => {
    this.playerService.hp -= 5;
    return 'Imp attacks you for 5 damage';
  };
  reward = () => {};
}

export class FireWitch extends Monster {
  name = 'Fire Witch';
  hp = 35;

  takeAction = () => {
    this.playerService.hp -= 18;
    return 'Fire Witch throws a fireball at you for 18 damage';
  };
  reward = () => {
    this.unlocksService.unlock('Fireball');
    this.unlocksService.unlock('Icebeam');
  };
}

export class IceWitch extends Monster {
  name = 'Ice Witch';
  hp = 35;

  takeAction = () => {
    this.playerService.hp -= 18;
    return 'Fire Witch shoots an icebeam at you for 18 damage';
  };
  reward = () => {};
}
