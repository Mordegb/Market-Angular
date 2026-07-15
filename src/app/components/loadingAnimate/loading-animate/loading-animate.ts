import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-animate',
  imports: [],
  templateUrl: './loading-animate.html',
  styleUrl: './loading-animate.scss',
  host: { //por aq pelo oq entendi seto as variaveis que o scss precisa
    '[style.--animation-color]': 'color()', //referencial da variavel do readonly em formato de signal
  },
})
export class LoadingAnimate {
  readonly color = input<string>('#039ae5');
}
