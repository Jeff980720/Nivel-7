import { Component, OnInit } from '@angular/core';
import { Socio } from '../../models/Socio';
import { FormsModule } from '@angular/forms';
import { SociosService } from '../../services/socios';

@Component({
  selector: 'app-add-aporte-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-aporte-component.html',
  styleUrl: './add-aporte-component.css',
})
export class AddAporteComponent implements OnInit {
  clientes: Socio[] = [];
  socioSeleccionado: number = 0;

  constructor(private sociosService: SociosService) {}

  ngOnInit(): void {
    this.clientes = this.sociosService.getSocios().items;
  }
}

