import { Component, Input, input, OnInit, signal } from '@angular/core';
import { SociosService } from '../../services/socios';
import { CommonModule } from '@angular/common';
import { Coperativa } from '../../models/Coperativa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-socios-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './socios-component.html',
  styleUrl: './socios-component.css',
})
export class SociosComponent implements OnInit {
  cooperativa!: Coperativa;

  constructor(private sociosService: SociosService, private router: Router) { }

  irAAgregarSocio(): void {
    this.router.navigate(['/add-socio']);
  }

  irAAgregarAporte(): void {
    this.router.navigate(['/aportes']);
  }

  irAAgregarPagos(): void {
    this.router.navigate(['/pagos']);
  }

  irAAgregarPrestamos(): void {
    this.router.navigate(['/prestamos']);
  }

  irAAgregarCaja(): void {
    this.router.navigate(['/caja']);
  }

  ngOnInit(): void {
    this.cooperativa = this.sociosService.getSocios();
  }
}
