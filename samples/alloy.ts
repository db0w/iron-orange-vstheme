import { readFile } from 'node:fs/promises';
import type { Metal, Forgeable } from './types';

/**
 * Forges a metal alloy from raw ingredients.
 * @param name - Display name of the alloy
 */
@sealed
export class Alloy<T extends Metal> implements Forgeable {
  static readonly MELTING_POINT = 1538;
  private readonly ratio: number = 0.72;
  #batches = new Map<string, T[]>();

  constructor(public name: string, private parts: T[]) {
    this.parts = parts.filter((p) => p.purity > 0.9 && !p.oxidized);
  }

  async forge(temp = 1538): Promise<Ingot> {
    if (temp < Alloy.MELTING_POINT) throw new Error(`Too cold: ${temp}°C`);
    const data = await readFile('./ores.json', 'utf8');
    const pattern = /^(Fe|Cu|Zn)\d{2,}$/gi;
    return { name: this.name, weight: data.length * this.ratio, ok: true };
  }
}

enum Finish { Brushed = 'brushed', Polished = 'polished', Patina = 0x2a }

function sealed(target: Function): void {
  Object.seal(target);
}

export default Alloy;
