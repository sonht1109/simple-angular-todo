import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public storage: Storage;
  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  get(key: string) {
    return this.storage.getItem(key);
  }

  setObject(key: string, value: any) {
    if (!value) return;
    this.storage.setItem(key, JSON.stringify(value));
  }

  getObject(key: string) {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }
}
