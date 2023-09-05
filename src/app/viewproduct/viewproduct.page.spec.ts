import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewproductPage } from './viewproduct.page';

describe('ViewproductPage', () => {
  let component: ViewproductPage;
  let fixture: ComponentFixture<ViewproductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}

