import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent {
  private numeroActual: string | null = null
  private numeroAnterior: string | null = null
  private operador: string | null = null
  private operaciones: string[] = ['+', '-', '*', '/'];
  fecha: string = '';
  salida: string = '';

  agregar(valor: string): void {
    if (this.operaciones.includes(valor)) {
      this.operador = valor;
      this.numeroAnterior = this.numeroActual;
      this.numeroActual = '';
      this.salida += valor;
    } 
    else if (valor === '=') {
      if (this.numeroActual === null) {
        this.numeroActual = this.numeroAnterior;
      } else {
        this.calcular();
      }
    } 
    else if (this.salida === '') {
      this.salida = "S/" + valor;
      if (this.numeroActual) {
        this.numeroActual += valor;
        } else {
        this.numeroActual = valor;
        }
    }
    else if (this.salida[this.salida.length-1] === this.operador) {
      this.salida += "S/" + valor;
      this.numeroActual += valor;
    }
    else if (this.salida === 'S/0' && valor === '0') {
      this.salida = 'S/0';
      this.numeroActual = '0';
    }
    else if (valor === '0') {
      if (this.numeroActual !== '0') {
         this.salida += valor;
         this.numeroActual += valor;
      }
    } else {
      if (this.numeroActual === '0') {
         this.numeroActual = valor;
         this.salida = this.salida.slice(0, -1) + valor;
      } else {
         this.numeroActual += valor;
         this.salida += valor;
      }
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
    this.numeroAnterior = null;
    this.operador = null;
    this.salida = "S/" + this.numeroActual;
  }

  limpiar(): void {
    this.salida = '';
    this.numeroActual = null;
    this.numeroAnterior = null;
    this.operador = null;
  }

  borrar(): void {
    this.salida = this.salida.slice(0, -1);
    if (this.numeroActual !== null) {
      this.numeroActual = this.numeroActual.slice(0, -1);
    }
  }

  getDate(): void {
    let date = new Date();
    this.fecha = date.toLocaleDateString();
  }
}
