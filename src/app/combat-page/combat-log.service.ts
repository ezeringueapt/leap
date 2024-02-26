import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CombatLogService {
  combatLog: string[] = [];

  addLine(line: string) {
    this.combatLog.unshift(line);
  }

  clear() {
    this.combatLog = [];
  }
}
