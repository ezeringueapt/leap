import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnFireballComponent } from './learn-fireball.component';

describe('LearnFireballComponent', () => {
  let component: LearnFireballComponent;
  let fixture: ComponentFixture<LearnFireballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnFireballComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnFireballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
