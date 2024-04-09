export class DataRequiredError extends Error {
  constructor(message = "Data is required to access this page") {
    super(message);
    this.name = "DataRequiredError";
  }
}
