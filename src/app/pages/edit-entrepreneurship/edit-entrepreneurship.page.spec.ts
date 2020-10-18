import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditEntrepreneurshipPage } from './edit-entrepreneurship.page';

describe('EditEntrepreneurshipPage', () => {
  let component: EditEntrepreneurshipPage;
  let fixture: ComponentFixture<EditEntrepreneurshipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEntrepreneurshipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEntrepreneurshipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
