import { UnlocksService } from '../unlocks.service';
import { PlayerService } from './player.service';

type MonsterStatuses = 'minimized';

export abstract class Monster {
  constructor(
    protected playerService: PlayerService,
    protected unlocksService: UnlocksService
  ) {}
  abstract name: string;
  abstract hp: number;

  abstract takeAction: () => string;
  abstract reward: () => void;

  statuses: MonsterStatuses[] = [];

  isDefeated = () => {
    return this.hp <= 0;
  };

  takeDamage = (ammounOfDamage: number) => {
    if (this.statuses.includes('minimized')) {
      ammounOfDamage = Math.floor(ammounOfDamage * 1.4);
    }
    this.hp -= ammounOfDamage;
    return ammounOfDamage;
  };

  giveStatus(status: MonsterStatuses) {
    this.statuses.push(status);
  }
}

export class Imp extends Monster {
  name = 'Imp';
  hp = 8;

  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(5);
    return `Imp attacks you for ${damageTaken} damage`;
  };
  reward = () => {};
}

export class FireWitch extends Monster {
  name = 'Fire Witch';
  hp = 1;

  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(18);
    return `Fire Witch throws a fireball at you for ${damageTaken} damage`;
  };
  reward = () => {
    this.unlocksService.unlock('Fireball');
    this.unlocksService.unlock('Icebeam');
  };
}

export class IceWitch extends Monster {
  name = 'Ice Witch';
  hp = 1;

  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(18);
    return `Fire Witch shoots an icebeam at you for ${damageTaken} damage`;
  };
  reward = () => {};
}
