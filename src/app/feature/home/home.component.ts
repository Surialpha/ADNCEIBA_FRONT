import { Component, OnInit } from '@angular/core';
import TrmApi from 'trm-api';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  trmapi = new TrmApi('NcTOM4BfmPksu1JFayeBVbHfA');
  valor: string;

  constructor() {}

  ngOnInit() {
    this.trmapi
      .latest()
      .then((data) => {
        this.valor = data.valor + ' ' + data.unidad;
      })
      .catch((error) => console.log(error));
  }
}
