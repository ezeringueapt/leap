import { Injectable } from '@angular/core';
import { Unlockables } from './spells';
import { PlayerService } from './combat-page/player.service';

const LOCAL_STORAGE_KEY = 'cookie';
@Injectable({
  providedIn: 'root',
})
export class UnlocksService {
  constructor(private playerService: PlayerService) {}
  private unlockedStuff: Record<string, boolean> = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || '{ "MagicMissle" : true}'
  );

  private unlockedClasses = Object.fromEntries(
    Object.entries(this.unlockedStuff).map(([className]) => [
      className,
      this.spellNameToSpellClass(className),
    ])
  );

  unlock(key: string) {
    this.unlockedStuff[key] = true;
    this.unlockedClasses[key] = this.spellNameToSpellClass(key);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.unlockedStuff));
    return this.unlockedClasses[key];
  }

  isUnlocked<T extends Unlockables.Unlockable>(
    unlock: new (...args: any[]) => T
  ) {
    return this.unlockedStuff[unlock.name];
  }

  isMultipleUnlocked(
    unlocks: (new (...args: any[]) => Unlockables.Unlockable)[]
  ) {
    return unlocks.map((unlock) => this.isUnlocked(unlock)).every(Boolean);
  }

  getUnlockedSpells(): Unlockables.Spell[] {
    return Object.values(this.unlockedClasses).filter((unlockable) =>
      isSpell(unlockable)
    ) as Unlockables.Spell[];
  }

  private spellNameToSpellClass(spellName: string): Unlockables.Unlockable {
    return new (<any>Unlockables)[spellName](this, this.playerService);
  }
}

function isSpell(
  unlockable: Unlockables.Unlockable
): unlockable is Unlockables.Spell {
  return (unlockable as Unlockables.Spell).action !== undefined;
}
