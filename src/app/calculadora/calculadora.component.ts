import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
})
export class CalculadoraComponent {
  numeroActual: string | null = null;
  numeroAnterior: string | null = null;
  operador: string | null = null;
  private operaciones: string[] = ['+', '-', '×', '/'];
  fecha: string = '';

  agregar(valor: string): void {
    if (this.operaciones.includes(valor)) {
      if (this.operador !== null) {
        return;
      } else if (this.numeroActual === null && (valor === '-')) {
        this.numeroActual = valor;
        return;
      } else if (this.numeroActual === null && valor !== '-') {
        return;
      } else if (this.numeroActual === '-') {
        return;
      } else {
        this.operador = valor;
        this.numeroAnterior = this.numeroActual;
        this.numeroActual = null;
      }
    } 
    else if (valor === '=') {
      if (this.numeroActual === null) {
        this.numeroActual = this.numeroAnterior;
      } else if (this.operador === null) {
        console.log(this.numeroActual);
      } else {
        this.calcular();
      }
    } 
    else if ( valor === '.') {
      if (this.numeroActual === null) {
        this.numeroActual = '0.';
      } else if (this.numeroActual === '-') {
        this.numeroActual = '-0.';
      } else if (this.numeroActual.includes('.')) {
        return;
      } else {
        this.numeroActual += valor;
      }
    }
    else if ( valor === '0' && (this.numeroActual === '0' || this.numeroActual === '-0')) {
      return;
    } 
    else {
      if (this.numeroActual === null || this.numeroActual === '0') {
        this.numeroActual = valor;
      } else {
        this.numeroActual += valor;
      }
    }
    // console.log(this.numeroActual, this.numeroAnterior, this.operador);
  }

  calcular(): void {
    switch (this.operador) {
      case '+':
        this.numeroActual = (
          Number(this.numeroActual) + Number(this.numeroAnterior)
        ).toString();
        break;
      case '-':
        this.numeroActual = (
          Number(this.numeroAnterior) - Number(this.numeroActual)
        ).toString();
        break;
      case '×':
        this.numeroActual = (
          Number(this.numeroActual) * Number(this.numeroAnterior)
        ).toString();
        break;
      case '/':
        this.numeroActual = (
          Number(this.numeroAnterior) / Number(this.numeroActual)
        ).toString();
        break;
    }
    this.numeroAnterior = null;
    this.operador = null;
  }

  limpiar(): void {
    this.numeroActual = null;
    this.numeroAnterior = null;
    this.operador = null;
  }

  removerDigito(): void {
    console.log('---');
    console.log('numeroActual ' + this.numeroActual);
    console.log('numeroAnterior ' + this.numeroAnterior);
    console.log('operador ' + this.operador);
    console.log(`length: ${this.numeroActual?.length}`);
    // {{ numeroAnterior }} {{ operando}} . {{ numeroActual}}

    // Si el ‘numeroActual’ tiene un solo digito y el ‘numeroAnterior’ y el ‘operando’ son null, el ‘numeroActual’ debe cambiar a 0.
    if (
      this.numeroActual &&
      this.numeroActual.length === 1 &&
      this.numeroAnterior === null &&
      this.operador === null
    ) {
      this.numeroActual = '0';
    }

    // Si el ‘numeroActual’ tiene un solo digito, pero el ‘numeroAnterior’ y el ‘operando’ no son null, el ‘numeroActual’ debe setearse a null.
    else if (
      this.numeroActual &&
      this.numeroActual.length === 1 &&
      this.numeroAnterior !== null &&
      this.operador !== null
    ) {
      console.log('caso2');
      this.numeroActual = null;
    }

    //
    else if (
      this.numeroActual === null &&
      this.numeroAnterior !== null &&
      this.operador !== null
    ) {
      this.numeroActual = this.numeroAnterior;
      this.numeroAnterior = null;
      this.operador = null;
    }

    // Cuando el usuario haga click en debe remover el último dígito de ‘numeroActual’.
    else if (this.numeroActual) {
      if (this.numeroActual.length === 1) {
        this.numeroActual = '0';
      } else {
        this.numeroActual = this.numeroActual.slice(0, -1);
      }
    }

    console.log('---');
    console.log('numeroActual ' + this.numeroActual);
    console.log('numeroAnterior ' + this.numeroAnterior);
    console.log('operador ' + this.operador);
    console.log(`length: ${this.numeroActual?.length}`);
  }

  getDate(): void {
    let date = new Date();
    this.fecha = date.toLocaleDateString();
  }
}
