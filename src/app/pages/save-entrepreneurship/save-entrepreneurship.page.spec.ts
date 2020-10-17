import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaveEntrepreneurshipPage } from './save-entrepreneurship.page';

describe('SaveEntrepreneurshipPage', () => {
  let component: SaveEntrepreneurshipPage;
  let fixture: ComponentFixture<SaveEntrepreneurshipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveEntrepreneurshipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaveEntrepreneurshipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
