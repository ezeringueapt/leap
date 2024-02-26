import { Unlockables } from '../spells';
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
    return `${this.name} attacks you for ${damageTaken} damage`;
  };
  reward = () => {};
}

export class Slime extends Monster {
  name = 'Slime';
  hp = 7;
  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(9);
    return `${this.name} attacks you for ${damageTaken} damage`;
  };
  reward = () => {};
}

export class Skeleton extends Monster {
  name = 'Skeleton';
  hp = 14;
  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(15);
    return `${this.name} attacks you for ${damageTaken} damage`;
  };
  reward = () => {};
}

export class Scorpion extends Monster {
  name = 'Scorpion';
  hp = 18;
  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(20);
    return `${this.name} attacks you for ${damageTaken} damage`;
  };
  reward = () => {};
}

export class Dragon extends Monster {
  name = 'Dragon';
  hp = 30;
  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(28);
    return `${this.name} attacks you for ${damageTaken} damage`;
  };
  reward = () => {};
}

export class Golem extends Monster {
  name = 'Golem';
  hp = 70;
  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(35);
    return `${this.name} attacks you for ${damageTaken} damage`;
  };
  reward = () => {
    this.unlocksService.unlock(Unlockables.StoneDefence.name);
  };
}

export class FireWitch extends Monster {
  name = 'Fire Witch';
  hp = 30;

  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(18);
    return `${this.name} throws a fireball at you for ${damageTaken} damage`;
  };
  reward = () => {
    this.unlocksService.unlock(Unlockables.Fireball.name);
    this.unlocksService.unlock(Unlockables.Icebeam.name);
  };
}

export class IceWitch extends Monster {
  name = 'Ice Witch';
  hp = 30;

  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(18);
    return `${this.name} shoots an icebeam at you for ${damageTaken} damage`;
  };
  reward = () => {};
}

export class Queen extends Monster {
  name = 'Queen';
  hp = 40;

  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(26);
    return `${this.name} shoots an icebeam at you for ${damageTaken} damage`;
  };
  reward = () => {};
}

export class DemonLord extends Monster {
  name = 'Demon Lord';
  hp = 1000;

  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(32);
    return `${this.name} shoots an icebeam at you for ${damageTaken} damage`;
  };
  reward = () => {};
}
