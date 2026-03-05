import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BingoItem } from '../types/bingo.types';

const STORAGE_KEY = 'bingo-items';

@Injectable({ providedIn: 'root' })
export class BingoService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly items = signal<BingoItem[]>(this.loadFromStorage());

  private loadFromStorage(): BingoItem[] {
    if (!this.isBrowser) return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private persist(): void {
    if (!this.isBrowser) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items()));
  }

  addItem(text: string): void {
    const item: BingoItem = {
      id: crypto.randomUUID(),
      text: text.trim(),
      checked: false,
    };
    this.items.update(list => [...list, item]);
    this.persist();
  }

  updateItem(id: string, text: string): void {
    this.items.update(list =>
      list.map(item => (item.id === id ? { ...item, text: text.trim() } : item))
    );
    this.persist();
  }

  deleteItem(id: string): void {
    this.items.update(list => list.filter(item => item.id !== id));
    this.persist();
  }

  toggleItem(id: string): void {
    this.items.update(list =>
      list.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
    this.persist();
  }

  resetChecked(): void {
    this.items.update(list => list.map(item => ({ ...item, checked: false })));
    this.persist();
  }
}
