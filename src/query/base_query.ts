import type { SQLResponse } from "../dialect/types";
import type { DatabaseDriver } from "../driver/base_driver";

export abstract class BaseQuery {
  constructor(protected driver: DatabaseDriver) { }
  abstract flatten(): SQLResponse;
  execute() {
    return this.driver.execute(this);
  }
}
