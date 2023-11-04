export class UnAuthenticatedError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UnAuthorizedError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class MissingRequiredAttribute extends Error {
  constructor(message: string) {
    super(message);
  }
}


export class RequiredEntityNotFound extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ErrorProcessingFile extends Error {
  constructor(message: string) {
    super(message);
  }
}


export class JWTError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class BcryptError extends Error {
  constructor(message: string) {
    super(message);
  }
}


export class InvalidCredentials extends Error {
  constructor(message: string) {
    super(message);
  }
}

