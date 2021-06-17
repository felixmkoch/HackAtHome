import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateComponent } from './estimate.component';

describe('EstimateComponent', () => {
  let component: EstimateComponent;
  let fixture: ComponentFixture<EstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
