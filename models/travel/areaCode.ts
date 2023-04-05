interface AreaCodeEntity {
  /**
   * label
   * @type {string}
   */
  label: string;
  /**
   * value
   * @type {string}
   */
  value: string;
}

export class AreaCode {
  constructor(private properties: AreaCodeEntity) {}

  get label() {
    return this.properties.label;
  }

  get value() {
    return this.properties.value;
  }
}
