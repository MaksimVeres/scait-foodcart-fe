import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OwnProfilePageComponent} from './own-profile-page.component';

describe('OwnProfilePageComponent', () => {
  let component: OwnProfilePageComponent;
  let fixture: ComponentFixture<OwnProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnProfilePageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
