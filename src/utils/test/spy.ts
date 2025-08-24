export class Spy<TArgs = unknown> {
  // Private call tracking
  #calls: TArgs[] = []

  /** Returns true if the spy was ever called */
  get called(): boolean {
    return this.#calls.length > 0
  }

  /** Number of times the spy was called */
  get callCount(): number {
    return this.#calls.length
  }

  /** Array of arguments passed to each call */
  get calls(): TArgs[] {
    return [...this.#calls]
  }

  /** The spy function to pass as a callback */
  fn = (...args: TArgs[]): void => {
    this.#calls.push(...args)
  }

  /** Reset call tracking */
  reset(): void {
    this.#calls = []
  }
}
