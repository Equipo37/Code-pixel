const BaseException = require("./base.exceptions")

class NotAuthorized extends BaseException {

    constructor(message) {
        super(message, 401)
    }
}

class NotFound extends BaseException {

    constructor(message) {
        super(message, 404)
    }
}

module.exports = {NotAuthorized, NotFound }