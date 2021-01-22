import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OwnArticlesPageComponent} from './own-articles-page.component';

describe('OwnArticlesPageComponent', () => {
  let component: OwnArticlesPageComponent;
  let fixture: ComponentFixture<OwnArticlesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnArticlesPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnArticlesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
