import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBizListingComponent } from './create-biz-listing.component';

describe('CreateBizListingComponent', () => {
  let component: CreateBizListingComponent;
  let fixture: ComponentFixture<CreateBizListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBizListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBizListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
