import { Pages } from './app-routing.module';
import { Monster } from './combat-page/monsters';
import { PlayerService } from './combat-page/player.service';
import { UnlocksService } from './unlocks.service';
import { getRandomNumberArbitrary } from './utils/get-random-number-arbitrary';

export namespace Unlockables {
  export abstract class Unlockable {
    constructor(
      protected unlocksService: UnlocksService,
      protected playerService: PlayerService
    ) {}
    name = this.constructor.name;
    abstract placeToGoAfterUnlock: Pages;
  }

  export class Mushroom extends Unlockable {
    placeToGoAfterUnlock = Pages.Heal;
  }
  export class GingerRoot extends Unlockable {
    placeToGoAfterUnlock = Pages.Heal;
  }
  export class Lavender extends Unlockable {
    placeToGoAfterUnlock = Pages.Heal;
  }
  export class Chamomile extends Unlockable {
    placeToGoAfterUnlock = Pages.Heal;
  }
  export class BlueStone extends Unlockable {
    placeToGoAfterUnlock = Pages.Minimize;
  }
  export class EatingPlant extends Unlockable {
    placeToGoAfterUnlock = Pages.Minimize;
  }
  export class RainbowFish extends Unlockable {
    placeToGoAfterUnlock = Pages.Minimize;
  }

  export abstract class Spell extends Unlockable {
    abstract action: (monster: Monster, monsters: Monster[]) => string;
    abstract target: TargetingType;
  }

  export type TargetingType = 'single' | 'all' | 'self';

  export class MagicMissle extends Spell {
    placeToGoAfterUnlock = Pages.Home;
    target: TargetingType = 'single';
    action = (monster: Monster) => {
      this.playerService.mp -= 8;
      const dmg = Math.floor(
        this.playerService.damage * (getRandomNumberArbitrary(10, 20) / 100 + 1)
      );
      monster.hp -= dmg;
      return `MagicMissle does ${dmg} non-elemental damage to ${monster.name}`;
    };
  }

  export class Gale extends Spell {
    placeToGoAfterUnlock = Pages.Home;
    target: TargetingType = 'all';
    action = (monster: Monster, monsters: Monster[]) => {
      this.playerService.mp -= 8;
      monsters.forEach((monster) => (monster.hp -= 10));

      return `Gale does 10 wind damage to all enemies`;
    };
  }

  export class Minimize extends Spell {
    placeToGoAfterUnlock = Pages.Home;
    target: TargetingType = 'self';
    action = () => '';
  }

  export class Heal extends Spell {
    placeToGoAfterUnlock = Pages.Home;
    target: TargetingType = 'self';
    action = () => {
      const ammountToHeal = Math.floor(this.playerService.maxHp * 0.4);
      this.playerService.hp += ammountToHeal;
      if (this.playerService.hp > this.playerService.maxHp) {
        this.playerService.hp = this.playerService.maxHp;
      }
      return `You Heal your health for ${ammountToHeal} points`;
    };
  }

  export class Fireball extends Spell {
    target: TargetingType = 'single';
    placeToGoAfterUnlock = Pages.Home;
    action = (monster: Monster) => {
      monster.hp -= 30;
      return `Fireball does 30 fire damnge to ${monster.name}`;
    };
  }

  export class Icebeam extends Spell {
    target: TargetingType = 'all';
    placeToGoAfterUnlock = Pages.Home;
    action = (monster: Monster, monsters: Monster[]) => {
      this.playerService.mp -= 8;
      monsters.forEach((monster) => (monster.hp -= 20));

      return `Icebeam does 20 ice damage to all enemies`;
    };
  }
}
