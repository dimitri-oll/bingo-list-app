import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BingoService } from '../services/bingo.service';

@Component({
  selector: 'app-home',
  imports: [MatCheckboxModule, MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly bingoService = inject(BingoService);

  toggle(id: string): void {
    this.bingoService.toggleItem(id);
  }

  reset(): void {
    this.bingoService.resetChecked();
  }

}
