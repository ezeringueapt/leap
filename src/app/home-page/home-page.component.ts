import { Component } from '@angular/core';
import { UnlocksService } from '../unlocks.service';
import { Router } from '@angular/router';
import { Unlockables } from '../spells';
import { PlayerService } from '../combat-page/player.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(
    public unlocksService: UnlocksService,
    private router: Router,
    private playerService: PlayerService
  ) {}

  magicMissileConfirm() {
    alert('Magic Missile does random damage to one target');
  }
  healButtonClicked() {
    if (this.unlocksService.isUnlocked(Unlockables.Heal)) {
      alert('Heal restores a portion of your health.');
    } else {
      this.router.navigateByUrl('heal-page');
    }
  }
  galeButtonClicked() {
    if (this.unlocksService.isUnlocked(Unlockables.Gale)) {
      alert('Gale is a spell that damages multiple targets.');
    } else {
      this.router.navigateByUrl('gale-page');
    }
  }
  minimizeButtonClicked() {
    if (this.unlocksService.isUnlocked(Unlockables.Minimize)) {
      alert(
        'Minimize makes your target smaller causing them to take more damage.'
      );
    } else {
      this.router.navigateByUrl('minimize-page');
    }
  }
  fireballConfirm() {
    const confirmed = confirm(
      'You need to defeat a powerful foe for this spell. Are you ready?'
    );
    if (confirmed) {
      this.router.navigateByUrl('combat-page?encounter=99');
    }
  }
  demonlordConfirm() {
    alert('You can only fight the Demonlord when you have 6 spells unlocked!');
  }
  combatButtonClicked() {
    const unlockedSpellsCount = this.unlocksService.getUnlockedSpells().length;
    const playerLevel = this.playerService.level;
    if (playerLevel > unlockedSpellsCount * 2) {
      alert(
        `Your level (${playerLevel}) is 2x your number of spells (${unlockedSpellsCount}), Learn more spells to level up`
      );
      return;
    }
    this.router.navigateByUrl(
      `combat-page?encounter=${this.unlocksService.getUnlockedSpells().length}`
    );
  }
}
