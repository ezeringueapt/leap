import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimizePageComponent } from './minimize-page.component';

describe('MinimizePageComponent', () => {
  let component: MinimizePageComponent;
  let fixture: ComponentFixture<MinimizePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinimizePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimizePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
