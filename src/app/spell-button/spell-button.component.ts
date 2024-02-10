import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spell-button',
  templateUrl: './spell-button.component.html',
  styleUrls: ['./spell-button.component.scss'],
})
export class SpellButtonComponent {
  @Input()
  bgColor?: string;
}
