import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { LoaderService } from "./modules/core/services/loader.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  providers: [MessageService],
})
export class AppComponent {
  title = "mmcraz";
  constructor(public loaderService: LoaderService) {}
}
