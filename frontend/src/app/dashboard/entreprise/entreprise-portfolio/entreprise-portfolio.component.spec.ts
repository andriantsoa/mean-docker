import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreprisePortfolioComponent } from './entreprise-portfolio.component';

describe('EntreprisePortfolioComponent', () => {
  let component: EntreprisePortfolioComponent;
  let fixture: ComponentFixture<EntreprisePortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntreprisePortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntreprisePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
