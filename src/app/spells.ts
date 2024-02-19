import { Pages } from './app-routing.module';
import { Monster } from './combat-page/monsters';
import { PlayerService } from './combat-page/player.service';
import { UnlocksService } from './unlocks.service';

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
    abstract action: (monster: Monster) => string;
    abstract unlocked: () => boolean;
  }

  export class Gale extends Spell {
    placeToGoAfterUnlock = Pages.Home;
    unlocked = () => this.unlocksService.isUnlocked(Gale);
    action = (monster: Monster) => {
      monster.hp -= 40;
      return `Gale does 40 wind damage to ${monster.name}`;
    };
  }

  export class Minimize extends Spell {
    placeToGoAfterUnlock = Pages.Home;
    unlocked = () =>
      this.unlocksService.isMultipleUnlocked([
        BlueStone,
        EatingPlant,
        RainbowFish,
      ]);
    action = () => '';
  }

  export class Heal extends Spell {
    placeToGoAfterUnlock = Pages.Home;
    action = () => {
      this.playerService.hp += 20;
      return 'You Heal your health for 50 points';
    };
    unlocked = () =>
      this.unlocksService.isMultipleUnlocked([
        Mushroom,
        GingerRoot,
        Chamomile,
        Lavender,
      ]);
  }
}
