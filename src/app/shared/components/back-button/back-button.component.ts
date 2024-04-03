import { Location } from "@angular/common";
import { Component, inject } from "@angular/core";

@Component({
  selector: "app-back-button",
  templateUrl: "./back-button.component.html",
  styleUrls: ["./back-button.component.scss"],
  standalone: true,
})
export class BackButtonComponent {
  private readonly _location = inject(Location);

  public back(): void {
    this._location.back();
  }
}
