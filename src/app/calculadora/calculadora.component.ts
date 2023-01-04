import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent {
  private numeroActual: string = '';
  private numeroAnterior: string = '';
  private operador: string = '';
  private operaciones: string[] = ['+', '-', '*', '/'];
  salida: string = '';


  agregar(valor: string): void {
    if (this.operaciones.includes(valor)) {
      this.operador = valor;
      this.numeroAnterior = this.numeroActual;
      this.numeroActual = '';
      this.salida = this.salida + valor;
    } 
    else if (valor === '=') {
      this.calcular();
    } 
    else if (this.salida === '') {
      this.salida = "S/" + valor;
      this.numeroActual += valor;
    }
    else if (this.salida[this.salida.length-1] === this.operador) {
      this.salida = this.salida + "S/" + valor;
      this.numeroActual += valor;
    }
    else {
      this.salida = this.salida + valor;
      this.numeroActual += valor;
    }
    console.log(this.numeroActual, this.numeroAnterior, this.operador, this.salida)
  }

  calcular(): void {
    switch (this.operador) {
      case '+':
        this.numeroActual = (Number(this.numeroActual) + Number(this.numeroAnterior)).toString();
        break;
      case '-':
        this.numeroActual = (Number(this.numeroAnterior) - Number(this.numeroActual)).toString();
        break;
      case '*':
        this.numeroActual = (Number(this.numeroActual) * Number(this.numeroAnterior)).toString();
        break;
      case '/':
        this.numeroActual = (Number(this.numeroAnterior) / Number(this.numeroActual)).toString();
        break;
    }
    this.salida = "S/" + this.numeroActual;
    console.log(this.numeroAnterior, this.numeroActual);
  }

  limpiar(): void {
    this.salida = '';
    this.numeroActual = '';
    this.numeroAnterior = '';
    this.operador = '';
  }
}
