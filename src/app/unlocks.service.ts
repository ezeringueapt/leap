import { Injectable } from '@angular/core';

const LOCAL_STORAGE_KEY = 'cookie';
export enum UNLOCK {
  MUSHROOM = 'MUSHROOM',
  GINGERROOT = 'GINGERROOT',
  CHAMOMILE = 'CHAMOMILE',
  LAVENDER = 'LAVENDER',
  GALE = 'GALE',
  BLUESTONE = 'BLUESTONE',
  EATINGPLANT = 'EATINGPLANT',
  RAINBOWFISH = 'RAINBOWFISH',
  HEAL = 'HEAL',
}

enum SpellOrItem {
  SPELL,
  ITEM,
}

const spellOrItemMap = {
  [UNLOCK.GALE]: SpellOrItem.SPELL,
  [UNLOCK.MUSHROOM]: SpellOrItem.ITEM,
  [UNLOCK.CHAMOMILE]: SpellOrItem.ITEM,
  [UNLOCK.GINGERROOT]: SpellOrItem.ITEM,
  [UNLOCK.LAVENDER]: SpellOrItem.ITEM,
  [UNLOCK.BLUESTONE]: SpellOrItem.ITEM,
  [UNLOCK.EATINGPLANT]: SpellOrItem.ITEM,
  [UNLOCK.RAINBOWFISH]: SpellOrItem.ITEM,
  [UNLOCK.HEAL]: SpellOrItem.SPELL,
};

@Injectable({
  providedIn: 'root',
})
export class UnlocksService {
  private unlockedStuff: Record<UNLOCK, boolean> = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
  );

  countOfSpellsUnlocked() {
    return Object.entries(this.unlockedStuff).reduce((count, [key, value]) => {
      if (value && spellOrItemMap[key as UNLOCK] === SpellOrItem.SPELL) {
        count = count + 1;
      }
      return count;
    }, 0);
  }

  unlock(key: UNLOCK) {
    this.unlockedStuff[key] = true;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.unlockedStuff));
  }

  isUnlocked(unlock: UNLOCK) {
    return this.unlockedStuff[unlock];
  }

  isMultipleUnlocked(unlocks: UNLOCK[]) {
    return unlocks.map((unlock) => this.isUnlocked(unlock)).every(Boolean);
  }

  isHealUnlocked() {
    return this.isMultipleUnlocked([
      UNLOCK.MUSHROOM,
      UNLOCK.GINGERROOT,
      UNLOCK.CHAMOMILE,
      UNLOCK.LAVENDER,
    ]);
  }
  isGaleUnlocked() {
    return this.isMultipleUnlocked([UNLOCK.GALE]);
  }
  isMinimizeUnlocked() {
    return this.isMultipleUnlocked([
      UNLOCK.BLUESTONE,
      UNLOCK.EATINGPLANT,
      UNLOCK.RAINBOWFISH,
    ]);
  }
}
