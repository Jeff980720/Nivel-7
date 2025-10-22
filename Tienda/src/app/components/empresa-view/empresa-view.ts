import { Component, Input } from '@angular/core';
import { Empresa } from '../../model/Empresa';

@Component({
  selector: 'empresa-view',
  imports: [],
  templateUrl: './empresa-view.html',
  styleUrl: './empresa-view.css'
})
export class EmpresaView {
  @Input() empresa!: Empresa
}
