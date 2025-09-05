export class Spy<TArgs = unknown> {
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
    void (async () => {
      this.#calls.push(...args)

      await Promise.resolve()
    })()
  }

  /** Reset call tracking */
  reset = (): void => {
    void (async () => {
      this.#calls = []

      await Promise.resolve()
    })()
  }
}
