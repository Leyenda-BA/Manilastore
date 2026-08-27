import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CarritoService } from '../servicios/carrito';

@Component({
  selector: 'app-formulario',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  private rutaLogo = 'imagenes/59b11d34-6d45-4ee1-a28f-f56f95c2bc98.png';

  cliente = {
    nombre: '',
    celular: '',
    direccion: ''
  };

  constructor(private carrito: CarritoService) {}

  async confirmarCompra() {
    const items = this.carrito.obtenerItems();

    if (items.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    if (!this.cliente.nombre || !this.cliente.celular || !this.cliente.direccion) {
      alert('Completa todos los datos antes de confirmar.');
      return;
    }

    await this.generarPDF(items);
    this.carrito.limpiar();
  }

  private cargarImagenBase64(ruta: string): Promise<string> {
    return fetch(ruta)
      .then(res => res.blob())
      .then(blob => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  }

  private async generarPDF(items: any[]) {
    const doc = new jsPDF();

    try {
      const logoBase64 = await this.cargarImagenBase64(this.rutaLogo);
      doc.addImage(logoBase64, 'PNG', 14, 10, 40, 40);
    } catch {
    }

    doc.setFontSize(18);
    doc.text('FACTURA DE PEDIDO', 60, 25);

    doc.setFontSize(11);
  doc.text(`Cliente: ${this.cliente.nombre}`, 14, 58);
  doc.text(`Celular: ${this.cliente.celular}`, 14, 64);
  doc.text(`Dirección: ${this.cliente.direccion}`, 14, 70);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 76);

    const filas = items.map(item => [
      item.nombre,
      item.cantidad,
      `$${item.precio.toFixed(2)}`,
      `$${(item.precio * item.cantidad).toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 84,
      head: [['Producto', 'Cantidad', 'Precio Unit.', 'Subtotal']],
      body: filas,
    });

    const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(13);
    doc.text(`Total: $${total.toFixed(2)}`, 14, finalY);

    doc.save(`factura_${this.cliente.nombre}.pdf`);
  }
}