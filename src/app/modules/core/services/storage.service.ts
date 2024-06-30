import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, interval, Subscription } from "rxjs";

interface StorageChange {
  key: string;
  newValue: string | null;
}

@Injectable({
  providedIn: "root",
})
export class StorageService implements OnDestroy {
  private storageSubject = new BehaviorSubject<StorageChange | null>(null);
  private previousState: { [key: string]: string | null } = {};
  private storageSubscription: Subscription;

  constructor() {
    this.initializeState();
    this.storageSubscription = interval(1000).subscribe(() =>
      this.checkForChanges()
    );
  }

  ngOnDestroy() {
    if (this.storageSubscription) {
      this.storageSubscription.unsubscribe();
    }
  }

  private initializeState() {
    Object.keys(sessionStorage).forEach((key) => {
      this.previousState[key] = sessionStorage.getItem(key);
    });
  }

  private checkForChanges() {
    const currentState: { [key: string]: string | null } = {};

    Object.keys(sessionStorage).forEach((key) => {
      currentState[key] = sessionStorage.getItem(key);
    });

    const changes = this.detectChanges(this.previousState, currentState);

    if (changes.length > 0) {
      this.previousState = { ...currentState };
      changes.forEach((change) => this.storageSubject.next(change));
    }
  }

  private detectChanges(
    prevState: { [key: string]: string | null },
    currentState: { [key: string]: string | null }
  ): StorageChange[] {
    const changes: StorageChange[] = [];

    Object.keys(currentState).forEach((key) => {
      if (prevState[key] !== currentState[key]) {
        changes.push({ key, newValue: currentState[key] });
      }
    });

    Object.keys(prevState).forEach((key) => {
      if (!(key in currentState)) {
        changes.push({ key, newValue: null });
      }
    });

    return changes;
  }

  get storageChanges() {
    return this.storageSubject.asObservable();
  }

  setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
    this.checkForChanges(); // Immediate check after setting item
  }

  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  removeItem(key: string) {
    sessionStorage.removeItem(key);
    this.checkForChanges(); // Immediate check after removing item
  }

  clear() {
    sessionStorage.clear();
    this.checkForChanges(); // Immediate check after clearing storage
  }
}
