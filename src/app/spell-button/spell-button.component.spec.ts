import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellButtonComponent } from './spell-button.component';

describe('SpellButtonComponent', () => {
  let component: SpellButtonComponent;
  let fixture: ComponentFixture<SpellButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpellButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpellButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
