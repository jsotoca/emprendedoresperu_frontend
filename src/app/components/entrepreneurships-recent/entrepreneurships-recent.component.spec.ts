import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntrepreneurshipsRecentComponent } from './entrepreneurships-recent.component';

describe('EntrepreneurshipsRecentComponent', () => {
  let component: EntrepreneurshipsRecentComponent;
  let fixture: ComponentFixture<EntrepreneurshipsRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepreneurshipsRecentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntrepreneurshipsRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
