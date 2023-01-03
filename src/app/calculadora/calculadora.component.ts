import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent {
  private numeroActual: number = 0;
  private numeroAnterior: number = 0;
  private operador: string = '';
  private resultado: number = 0;
  private operaciones: string[] = ['+', '-', '*', '/'];
  salida: string = '';

  agregar(valor: string): void {
    if (this.operaciones.includes(valor)) {
      this.operador = valor;
      this.numeroActual = Number(this.salida);
      this.salida = this.salida + valor;
    } 
    else if (valor === '=') {
      console.log(this.salida.split(this.operador));
      this.numeroAnterior = Number(this.salida.split(this.operador)[1]);
      this.calcular();
    } 
    else if (valor === 'C') {
      this.limpiar();
    }
    else {
      this.salida = this.salida + valor;
    }
  }

  calcular(): void {
    switch (this.operador) {
      case '+':
        this.resultado = this.numeroActual + this.numeroAnterior;
        break;
      case '-':
        this.resultado = this.numeroActual - this.numeroAnterior;
        break;
      case '*':
        this.resultado = this.numeroActual * this.numeroAnterior;
        break;
      case '/':
        this.resultado = this.numeroActual / this.numeroAnterior;
        break;
    }
    this.salida = this.resultado.toString();
    console.log(this.numeroActual, this.numeroAnterior, this.operador, this.resultado);
  }

  limpiar(): void {
    this.salida = '';
  }
}
