import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DealsRecentComponent } from './deals-recent.component';

describe('DealsRecentComponent', () => {
  let component: DealsRecentComponent;
  let fixture: ComponentFixture<DealsRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsRecentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DealsRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
