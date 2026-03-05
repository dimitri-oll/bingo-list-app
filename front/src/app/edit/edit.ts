import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BingoService } from '../services/bingo.service';

@Component({
  selector: 'app-edit',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
  protected readonly bingoService = inject(BingoService);

  newItemText = '';
  editingId = signal<string | null>(null);
  editingText = signal('');

  addItem(): void {
    if (this.newItemText.trim()) {
      this.bingoService.addItem(this.newItemText);
      this.newItemText = '';
    }
  }

  startEdit(id: string, text: string): void {
    this.editingId.set(id);
    this.editingText.set(text);
  }

  saveEdit(): void {
    const id = this.editingId();
    if (id && this.editingText().trim()) {
      this.bingoService.updateItem(id, this.editingText());
    }
    this.editingId.set(null);
  }

  cancelEdit(): void {
    this.editingId.set(null);
  }

  deleteItem(id: string): void {
    this.bingoService.deleteItem(id);
  }
}
