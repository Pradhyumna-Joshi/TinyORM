import type { SQLResponse } from "../common/types";
import type { DatabaseDriver } from "../driver/base_driver";

export abstract class BaseQuery {
  constructor(protected driver: DatabaseDriver) { }
  abstract flatten(): SQLResponse;
  execute() {
    return this.driver.execute(this);
  }
}
