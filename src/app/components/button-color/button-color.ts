import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-button-color',
  standalone: true, 
  imports: [],
  templateUrl: './button-color.html',
  styleUrl: './button-color.scss',
})
export class ButtonColor {
  @Input() texto: string = 'Comprar';
  @Output() clicou = new EventEmitter<void>();

  aoClicar() {
    this.clicou.emit();
  }
}
