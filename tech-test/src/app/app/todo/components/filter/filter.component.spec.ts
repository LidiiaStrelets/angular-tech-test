import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterComponent } from "./filter.component";

fdescribe("FilterComponent", () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call clear function and clear filter", () => {
    component.filter = "some value";

    component.clearFilter();

    expect(component.filter).toBe("");
  });
});
