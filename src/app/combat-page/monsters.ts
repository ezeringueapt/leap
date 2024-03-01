import { Unlockables } from '../spells';
import { UnlocksService } from '../unlocks.service';
import { getRandomNumberArbitrary } from '../utils/get-random-number-arbitrary';
import { CombatLogService } from './combat-log.service';
import { PlayerService } from './player.service';

type MonsterStatuses = 'minimized' | 'blinded';

export abstract class Monster {
  constructor(
    protected playerService: PlayerService,
    protected unlocksService: UnlocksService,
    protected combatLogService: CombatLogService
  ) {}
  abstract name: string;
  abstract hp: number;

  abstract takeAction: (monsters: Monster[]) => string;
  abstract reward: () => void;

  statuses: MonsterStatuses[] = [];

  isDefeated = () => {
    return this.hp <= 0;
  };

  takeDamage = (ammounOfDamage: number): number => {
    return this.takeDamageHelper(ammounOfDamage);
  };

  giveStatus(status: MonsterStatuses) {
    this.statuses.push(status);
  }

  protected takeDamageHelper = (ammounOfDamage: number) => {
    if (this.statuses.includes('minimized')) {
      ammounOfDamage = Math.floor(ammounOfDamage * 1.5);
    }
    this.hp -= ammounOfDamage;
    return ammounOfDamage;
  };
}

export class Imp extends Monster {
  name = 'Imp';
  hp = 8;

  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(5, this);
    return `${this.name} attacks you for ${damageTaken} damage`;
  };
  reward = () => {};
}

export class Slime extends Monster {
  name = 'Slime';
  hp = 10;
  takeAction = () => {
    this.combatLogService.addLine('Slime casts Thwack');
    const oneThoughOneHundred = getRandomNumberArbitrary(0, 100);
    if (oneThoughOneHundred > 50) {
      const returnValue =
        this.playerService.hp < 0 ? `Your already dead` : `You die`;
      this.playerService.takeDamage(99999, this);
      return returnValue;
    }
    return `Thwack misses`;
  };
  reward = () => {};
}

export class Skeleton extends Monster {
  name = 'Skeleton';
  hp = 40;
  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(10, this);
    return `${this.name} attacks you for ${damageTaken} damage`;
  };
  reward = () => {};
}

export class Scorpion extends Monster {
  name = 'Scorpion';
  hp = 20;

  override takeDamage = (ammounOfDamage: number) => {
    this.combatLogService.addLine(
      `Scorpion's thick armor reduces the damage by 20`
    );
    let dmgToDeal = ammounOfDamage - 20;
    if (dmgToDeal < 0) {
      dmgToDeal = 0;
    }
    return this.takeDamageHelper(dmgToDeal - 30);
  };

  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(20, this);
    return `${this.name} attacks you for ${damageTaken} damage`;
  };
  reward = () => {};
}

export class Dragon extends Monster {
  name = 'Dragon';
  hp = 60;
  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(28, this);
    return `${this.name} attacks you for ${damageTaken} damage`;
  };
  reward = () => {};
}

export class Golem extends Monster {
  name = 'Golem';
  hp = 160;
  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(20, this);
    return `${this.name} attacks you for ${damageTaken} damage`;
  };
  reward = () => {
    this.unlocksService.unlock(Unlockables.StoneDefence.name);
  };
}

export class King extends Monster {
  name = 'King';
  hp = 160;
  turnsCharging = 0;

  takeAction = () => {
    if (this.turnsCharging >= 5) {
      this.playerService.takeDamage(99999, this);
      return `The king chops off your head with a mighty swing`;
    }
    this.turnsCharging++;
    return `King charges up a massive attack`;
  };
  reward = () => {
    this.unlocksService.unlock(Unlockables.ChargeAttack.name);
  };
}

export class Firebird extends Monster {
  name = 'Firebird';
  hp = 90;

  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(30, this);
    return `${this.name} throws a fireball at you for ${damageTaken} damage`;
  };
  reward = () => {
    this.unlocksService.unlock(Unlockables.Fireball.name);
    this.unlocksService.unlock(Unlockables.Icebeam.name);
  };
}

export class Icebird extends Monster {
  name = 'Icebird';
  hp = 45;

  override takeDamage = (ammounOfDamage: number) => {
    this.combatLogService.addLine(
      `Icebird's ice armor reduces the damage by 30`
    );
    let dmgToDeal = ammounOfDamage - 30;
    if (dmgToDeal < 0) {
      dmgToDeal = 0;
    }
    return this.takeDamageHelper(dmgToDeal - 30);
  };

  takeAction = () => {
    const damageTaken = this.playerService.takeDamage(10, this);
    return `${this.name} shoots an icebeam at you for ${damageTaken} damage`;
  };
  reward = () => {};
}

export class Queen extends Monster {
  name = 'Queen';
  hp = 400;
  calledForHelp = false;

  takeAction = (monsters: Monster[]) => {
    if (this.calledForHelp) {
      this.calledForHelp = false;
      monsters.push(this.slime());
      monsters.unshift(this.slime());
      return `Help shows up`;
    }
    if (monsters.length === 1 && getRandomNumberArbitrary(0, 100) > 50) {
      this.calledForHelp = true;
      return `The Queen calls for help`;
    }
    const damageTaken = this.playerService.takeDamage(50, this);
    return `${this.name} bops you for ${damageTaken} damage`;
  };
  reward = () => {
    this.unlocksService.unlock(Unlockables.BlindingLight.name);
  };

  private slime() {
    return new Slime(
      this.playerService,
      this.unlocksService,
      this.combatLogService
    );
  }
}

export class DemonLord extends Monster {
  name = 'Demon Lord';
  hp = 999999;
  calledForHelp = false;

  takeAction = (monsters: Monster[]) => {
    if (this.calledForHelp) {
      this.calledForHelp = false;
      monsters.push(this.dragon());
      return `Help shows up`;
    }
    if (monsters.length === 1 && getRandomNumberArbitrary(0, 100) > 90) {
      this.calledForHelp = true;
      return `The Demon Lord calls for help`;
    }
    const damageTaken = this.playerService.takeDamage(50, this);
    return `${this.name} slashes you for ${damageTaken} damage`;
  };
  reward = () => {
    alert('You defeated the Demon Lord. Show this alert to the Queen or King');
  };

  private dragon() {
    return new Dragon(
      this.playerService,
      this.unlocksService,
      this.combatLogService
    );
  }
}
