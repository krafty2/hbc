import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtitquetteComponent } from './etitquette.component';

describe('EtitquetteComponent', () => {
  let component: EtitquetteComponent;
  let fixture: ComponentFixture<EtitquetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtitquetteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtitquetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
