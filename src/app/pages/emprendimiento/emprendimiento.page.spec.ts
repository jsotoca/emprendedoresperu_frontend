import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmprendimientoPage } from './emprendimiento.page';

describe('EmprendimientoPage', () => {
  let component: EmprendimientoPage;
  let fixture: ComponentFixture<EmprendimientoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmprendimientoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmprendimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
