import { PlayerService } from './player.service';

export abstract class Monster {
  constructor(protected playerService: PlayerService) {}
  abstract name: string;
  abstract hp: number;

  abstract takeAction: () => string;

  isDefeated = () => {
    return this.hp <= 0;
  };
}

export class Imp extends Monster {
  name = 'Imp';
  hp = 40;

  takeAction = () => {
    this.playerService.hp -= 5;
    return 'Imp attacks you for 5 damage';
  };
}
