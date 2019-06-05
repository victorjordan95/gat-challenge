import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-calculos',
  templateUrl: './calculos.component.html',
  styleUrls: ['./calculos.component.scss']
})
export class CalculosComponent implements OnInit {

  public gases = [
    { 'formula': 'CBrF3', 'nome': 'Bromotrifluorometano', 'tc': 340.15, 'pc': 39.20058156, 'w': 0.173, 'm': 148.91 },
    { 'formula': 'CClF3', 'nome': 'Clorotrifluorometano', 'tc': 301.96, 'pc': 38.94398158, 'w': 0.18, 'm': 104.459 },
    { 'formula': 'CCl2F2', 'nome': 'Diclorodifluorometano', 'tc': 384.95, 'pc': 40.71057375, 'w': 0.18, 'm': 120.913 },
    { 'formula': 'CF4', 'nome': 'Tetrafluoreto de carbono', 'tc': 227.5, 'pc': 36.90105097, 'w': 0.186, 'm': 88.005 },
    { 'formula': 'CHClF2', 'nome': 'Clorodifluorometano', 'tc': 369.3, 'pc': 49.05994233, 'w': 0.219, 'm': 86.468 },
    { 'formula': 'CHF3', 'nome': 'Trifluorometano', 'tc': 298.89, 'pc': 47.72759628, 'w': 0.267, 'm': 70.014 },
    { 'formula': 'CH2F2', 'nome': 'Difluorometano', 'tc': 351.6, 'pc': 57.5376109, 'w': 0.276, 'm': 52.024 },
    { 'formula': 'CH3F', 'nome': 'Fluorometano', 'tc': 317.7, 'pc': 58.00146471, 'w': 0.204, 'm': 34.033 },
    { 'formula': 'CH4', 'nome': 'Metano', 'tc': 190.58, 'pc': 45.43793492, 'w': 0.011, 'm': 16.043 },
    { 'formula': 'CO', 'nome': 'Monóxido de carbono', 'tc': 132.92, 'pc': 34.53243577, 'w': 0.066, 'm': 28.01 },
    { 'formula': 'COS', 'nome': 'Sulfeto de carbonila', 'tc': 378.8, 'pc': 62.65974127, 'w': 0.097, 'm': 60.076 },
    { 'formula': 'CO2', 'nome': 'Dióxido de carbono', 'tc': 304.19, 'pc': 72.85465586, 'w': 0.228, 'm': 44.01 },
    { 'formula': 'C2ClF5', 'nome': 'Cloropentafluoroetano', 'tc': 353.15, 'pc': 31.15715911, 'w': 0.251, 'm': 154.467 },
    { 'formula': 'C2F4', 'nome': 'Tetrafluoretileno', 'tc': 306.45, 'pc': 38.92424312, 'w': 0.226, 'm': 100.016 },
    { 'formula': 'C2F6', 'nome': 'Hexafluoretano', 'tc': 292.8, 'pc': 29.40043617, 'w': 0.245, 'm': 138.02 },
    { 'formula': 'C2H2', 'nome': 'Acetileno', 'tc': 308.32, 'pc': 60.58720297, 'w': 0.187, 'm': 26.038 },
    { 'formula': 'C2H2F4', 'nome': '1.1.1.2-tetrafluoretano (R-134a)', 'tc': 380, 'pc': 36.4174587, 'w': 0.239, 'm': 102.031 },
    { 'formula': 'C2H3F3', 'nome': '1.1.1-trifluoretano', 'tc': 346.25, 'pc': 37.08856634, 'w': 0.253, 'm': 84.041 },
    { 'formula': 'C2H4', 'nome': 'Etileno', 'tc': 282.36, 'pc': 49.66196536, 'w': 0.085, 'm': 28.054 },
    { 'formula': 'C2H4F2', 'nome': '1.1-difluoroetano (R-152a)', 'tc': 386.6, 'pc': 44.40166577, 'w': 0.263, 'm': 66.051 },
    { 'formula': 'C2H5F', 'nome': 'Fluoroetano (R-161)', 'tc': 375.31, 'pc': 49.62248844, 'w': 0.209, 'm': 48.06 },
    { 'formula': 'C2H6', 'nome': 'Etano', 'tc': 305.42, 'pc': 48.1618424, 'w': 0.099, 'm': 30.07 },
    { 'formula': 'C3F8', 'nome': 'Perfluoropropano', 'tc': 345.05, 'pc': 26.4495364, 'w': 0.326, 'm': 188.02 },
    { 'formula': 'C3H4', 'nome': 'Propadieno', 'tc': 393.15, 'pc': 53.9846881, 'w': 0.16, 'm': 40.065 },
    { 'formula': 'C3H6', 'nome': 'Ciclopropano', 'tc': 397.91, 'pc': 55.02095725, 'w': 0.134, 'm': 42.081 },
    { 'formula': 'C3H6', 'nome': 'Propileno', 'tc': 364.76, 'pc': 45.52675799, 'w': 0.142, 'm': 42.081 },
    { 'formula': 'C3H8', 'nome': 'Propano', 'tc': 369.82, 'pc': 41.93435827, 'w': 0.152, 'm': 44.096 },
    { 'formula': 'Ar', 'nome': 'Argônio', 'tc': 150.86, 'pc': 48.33948854, 'w': 0, 'm': 39.948 },
    { 'formula': 'ClF3', 'nome': 'Trifluoreto de cloro', 'tc': 459.39, 'pc': 76.77274017, 'w': null, 'm': 92.448 },
    { 'formula': 'F2', 'nome': 'Flúor', 'tc': 144.31, 'pc': 51.46803445, 'w': 0.059, 'm': 37.997 },
    { 'formula': 'H2', 'nome': 'Hidrogênio', 'tc': 33.18, 'pc': 12.95829899, 'w': -0.22, 'm': 2.016 },
    { 'formula': 'H2S', 'nome': 'Sulfeto de hidrogênio', 'tc': 373.53, 'pc': 88.45790849, 'w': 0.36, 'm': 34.082 },
    { 'formula': 'Ne', 'nome': 'Néon', 'tc': 44.4, 'pc': 26.18306719, 'w': -0.04, 'm': 20.18 },
    { 'formula': 'O2', 'nome': 'Oxigênio', 'tc': 154.58, 'pc': 49.77052689, 'w': 0.022, 'm': 31.999 },
    { 'formula': 'O3', 'nome': 'Ozônio', 'tc': 261, 'pc': 55.00121879, 'w': 0.227, 'm': 47.998 },
    { 'formula': 'Xe', 'nome': 'Xénon', 'tc': 289.74, 'pc': 57.6363032, 'w': 0, 'm': 131.29 },
  ];
  public metodos = [
    {'nome': 'Peng-Robinson'},
    {'nome': 'Redlich-Kwong'}
  ];

  public gas;
  public pressao;
  public temperatura;
  public metodo;

  public result: any;

  showResult = false;
  constructor() { }


  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    form.value['gas'] = this.gases.filter(gas => gas['nome'] === form.value['gas']);
    console.log(form.value);
    /**
     * Voce manda calcular aqui em alguma fuck função
     * atribui nessa variavel e seta a variavel
     * SHOWRESULT como true, neste momento
     * vai aparecer na tela o resultado;
     */
    this.result = {
      'v' : 8.2,
      'w' : 0.37464,
      'T' : 1.144088783,
      'a' : 1.656066623
    };

    this.showResult = true; // essa variavel que mostra

  }

}
