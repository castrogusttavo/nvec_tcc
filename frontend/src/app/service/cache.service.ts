import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor() {}

  setCache(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key: string): any {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) {
      return null;
    }

    try {
      return JSON.parse(storedValue);
    } catch (error) {
      return storedValue;
    }
  }

  // Função recursiva para obter valor de chaves aninhadas
  getNestedCache(keys: string[], index: number = 0): any {
    const currentKey = keys[index];
    const storedValue = localStorage.getItem(currentKey);

    if (storedValue === null || storedValue === undefined) {
      return null; // Valor não encontrado
    }

    // Se ainda houver chaves para navegar
    if (index < keys.length - 1) {
      try {
        const parsedValue = JSON.parse(storedValue);
        return this.getNestedCache(keys, index + 1);
      } catch (error) {
        return null;
      }
    } else {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        return storedValue;
      }
    }
  }
}
