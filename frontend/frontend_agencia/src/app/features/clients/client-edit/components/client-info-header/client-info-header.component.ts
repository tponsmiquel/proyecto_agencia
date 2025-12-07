import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { Client } from "../../../clients.service";

@Component({
  selector: 'app-client-info-header',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './client-info-header.component.html',
  styleUrls: ['./client-info-header.component.css']
})
export class ClientInfoHeaderComponent {
@Input() client!: Client;
  constructor() {}
}