import { Injectable } from '@angular/core';
import { Unlockables } from './spells';

const LOCAL_STORAGE_KEY = 'cookie';
@Injectable({
  providedIn: 'root',
})
export class UnlocksService {
  private unlockedStuff: Record<string, boolean> = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
  );

  private unlockedClasses = Object.fromEntries(
    Object.entries(this.unlockedStuff).map(([className]) => [
      className,
      spellNameToSpellClass(className),
    ])
  );

  unlock(key: string) {
    this.unlockedStuff[key] = true;
    this.unlockedClasses[key] = spellNameToSpellClass(key);
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
}

function spellNameToSpellClass(spellName: string): Unlockables.Unlockable {
  return new (<any>Unlockables)[spellName]();
}

function isSpell(
  unlockable: Unlockables.Unlockable
): unlockable is Unlockables.Spell {
  return (unlockable as Unlockables.Spell).action !== undefined;
}
