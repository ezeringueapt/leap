import { Component } from '@angular/core';
import { UnlocksService } from '../unlocks.service';
import { Router, RouterLink } from '@angular/router';
import { HealComponent } from '../heal-page/heal-page.component';
import { SpellButtonComponent } from '../spell-button/spell-button.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(public unlocksService: UnlocksService, private router: Router) {}

  magicMissileConfirm() {
    alert('Magic Missile does random damage to one target');
  }
  healButtonClicked() {
    if (this.unlocksService.isHealUnlocked()) {
      alert('Heal restores a portion of your health.');
    } else {
      this.router.navigateByUrl('heal-page');
    }
  }
  galeButtonClicked() {
    if (this.unlocksService.isGaleUnlocked()) {
      alert('Gale is a spell that damages multiple targets.');
    } else {
      this.router.navigateByUrl('gale-page');
    }
  }
  minimizeButtonClicked() {
    if (this.unlocksService.isMinimizeUnlocked()) {
      alert(
        'Minimize makes your target smaller causing them to take more damage.'
      );
    } else {
      this.router.navigateByUrl('minimize-page');
    }
  }
  fireballConfirm() {
    confirm('You need to defeat a powerful foe for this spell. Are you ready?');
  }
  icebeamConfirm() {
    confirm('You need to defeat a powerful foe for this spell. Are you ready?');
  }
  demonlordConfirm() {
    confirm(
      'You can only fight the Demonlord when you have 6 spells unlocked!'
    );
  }
  combatButtonClicked() {
    this.router.navigateByUrl('combat-page');
  }
}
