export abstract class Column<T> {
  public readonly name: string;
  public readonly sqlType: string;
  protected isPrimaryKey: boolean = false;
  protected isNotNull: boolean = false;

  constructor(name: string, sqlType: string) {
    this.name = name;
    this.sqlType = sqlType;
  }

  primaryKey() {
    this.isPrimaryKey = true;
    return this;
  }

  notNull() {
    this.isNotNull = true;
    return this;
  }

  flatten(): string {
    let str: string = "";
    str = `"${this.name}" ${this.sqlType} `;
    if (this.isPrimaryKey) {
      str += ` PRIMARY KEY`;
    }
    if (this.isNotNull) {
      str += ` NOT NULL`;
    }
    return str;
  }
}

class IntegerColumn extends Column<number> {
  constructor(name: string) {
    super(name, "INTEGER");
  }
}

class TextColumn extends Column<string> {
  constructor(name: string) {
    super(name, "TEXT");
  }
}

// exports

export type ORMColumn = Column<number> | Column<string>;

export function integer(name: string) {
  return new IntegerColumn(name);
}

export function text(name: string) {
  return new TextColumn(name);
}
