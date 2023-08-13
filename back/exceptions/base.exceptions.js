class BaseException extends Error {
  constructor(message, status = 500, metadata = {}) {
    super(message);
    this.extendBase = true;
    this.name = this.constructor.name;
    this.status = status;
    this.metadata = metadata;
  }
}

module.exports = BaseException;
