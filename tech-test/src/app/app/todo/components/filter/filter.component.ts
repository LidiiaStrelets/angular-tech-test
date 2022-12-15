import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  @Output() onFilterChange = new EventEmitter<string>();
  filter = "";

  constructor() {}

  ngOnInit(): void {}

  clearFilter = () => {
    this.filter = "";
    this.onFilterChange.emit("");
  };

  handleChange = (e: string) => {
    this.onFilterChange.emit(e);
  };
}
