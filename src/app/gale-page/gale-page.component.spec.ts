import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalePageComponent } from './gale-page.component';

describe('GalePageComponent', () => {
  let component: GalePageComponent;
  let fixture: ComponentFixture<GalePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
