import { Environment } from './runtime'

export class EnvironmentEx extends Environment {
  constructor(public parent?: EnvironmentEx) {
    super(parent)
  }

  assign(items: Record<string, unknown>) {
    for (const [key, value] of Object.entries(items)) {
      this.set(key, value)
    }
  }

  clear() {
    this.variables.clear()
  }
}
