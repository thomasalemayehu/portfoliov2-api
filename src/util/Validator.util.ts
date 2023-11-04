import { ValidationError } from '../errors/index';
export class Validator {
  public static validateEmail(email: string): void {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email))
      throw new ValidationError(`${email} is not a valid email`);
  }

  public static validatePassword(password: string): void {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password))
      throw new ValidationError(
        `Password must have at least 8 characters, 1 capital, 1 small, 1 number and 1 special character`
      );
  }

  public static validateName(name: string): void {
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    if (!nameRegex.test(name))
      throw new ValidationError(
        `${name} is not a valid name`
      );
  }
  public static validateURL(url: string): void {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (!urlRegex.test(url))
      throw new ValidationError(
        `${url} is not a valid URL`
      );
  }
}