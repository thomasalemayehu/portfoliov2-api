/* eslint-disable no-useless-escape */
// import formData from "form-data";


function formValidator() {
  /*
        ========================================
        First Name Validation
        ========================================
    */

  const firstNameInput: HTMLInputElement = document.getElementById(
    "FirstName"
  ) as HTMLInputElement;
  const firstName: string = firstNameInput.value;
  const firstNameValidate: boolean = validateName(
    "FirstName",
    "FirstNameErrorMessage",
    "First name"
  );

  /*
        ========================================
        Last Name Validation
        ========================================
    */
  let lastNameValidate: boolean = true;
  const lastNameInput = document.getElementById("LastName") as HTMLInputElement;
  const lastName = lastNameInput.value;
  if (lastName) {
    lastNameValidate = validateName(
      "LastName",
      "LastNameErrorMessage",
      "Last name"
    );
  }

  /*
        ========================================
        Email Validation
        ========================================
    */
  const emailInput = document.getElementById("Email") as HTMLInputElement;
  const email = emailInput.value;
  const emailValidate = validateEmail("Email", "EmailErrorMessage");

  /*
        ========================================
        Subject Validation
        ========================================
    */
  let subjectValidate: boolean = true;
  const subjectInput = document.getElementById("Subject") as HTMLInputElement;
  const subject = subjectInput.value;
  if (subject) {
    subjectValidate = validateText(
      "Subject",
      "SubjectErrorMessage",
      6,
      "Subject"
    );
  }

  /*
        ========================================
        Message Validation
        ========================================
    */

  const messageInput = document.getElementById("Message") as HTMLInputElement;
  const message = messageInput.value;
  const messageValidate = validateText(
    "Message",
    "MessageErrorMessage",
    15,
    "Message"
  );

  /*
        ========================================
        Phone Validation
        ========================================
    */
  let phoneValidate: boolean = true;
  const input = document.getElementById("Phone") as HTMLInputElement;
  const phone = input.value;
  if (phone) {
    phoneValidate = validatePhone("Phone", "PhoneErrorMessage");
  }

  if (
    firstNameValidate &&
    lastNameValidate &&
    emailValidate &&
    phoneValidate &&
    subjectValidate &&
    messageValidate
  ) {
    const formElement = document.getElementById("Form");

    if (!formElement) return;
    formElement.classList.add("loader__container");
    const form = formElement.innerHTML;
    const newLoaderElement = document.createElement("div");
    newLoaderElement.className = "loader";
    formElement.innerHTML = "";
    formElement.classList.remove("loader__container");
    formElement.appendChild(newLoaderElement);

    sendEmail(firstName, lastName, email, phone, subject, message);

    setTimeout(() => {
      formElement.innerHTML = form;
    }, 6000);
  }
}

function validateName(
  id: string,
  errorDisplayId: string,
  itemName: string
): boolean {
  let validationStatus: boolean = false;

  const input = document.getElementById(id) as HTMLInputElement;
  const valueInput = input.value;
  const valueErrorElement = document.getElementById(errorDisplayId);

  if (!valueErrorElement) return validationStatus;

  //   if empty
  if (valueInput === "" || valueInput === null) {
    valueErrorElement.innerText = `${itemName} is required.`;
    valueErrorElement.classList.add("error__message");
  }
  //   very short first name
  else if (valueInput.length <= 2) {
    valueErrorElement.innerText = `${itemName} is too short.`;
    valueErrorElement.classList.add("error__message");
  }

  //   first name has number or symbols + submission
  else {
    let hasNumber = false;
    const n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = 0; i < n.length; i++) {
      if (valueInput.toString().includes(n[i])) {
        hasNumber = true;
        break;
      }
    }

    const regex = /^[A-Za-z]+$/;

    // if has number
    if (hasNumber) {
      valueErrorElement.innerText = `${itemName} has number.`;
      valueErrorElement.classList.add("error__message");
    }
    // has symbols
    else if (!regex.test(valueInput)) {
      valueErrorElement.innerText = `${itemName} includes invalid characters.`;
      valueErrorElement.classList.add("error__message");
    }
    // Valid
    else {
      valueErrorElement.classList.remove("error__message");
      validationStatus = true;
    }
  }

  return validationStatus;
}

function validateEmail(id: string, errorDisplayId: string): boolean {
  let validationStatus: boolean = false;
  const input = document.getElementById(id) as HTMLInputElement;
  const emailInput = input.value;
  const emailErrorElement = document.getElementById(errorDisplayId);

  if (!emailErrorElement) return validationStatus;

  if (!emailInput) {
    emailErrorElement.innerText = "Email is required.";
    emailErrorElement.classList.add("error__message");
  } else {
    //   check email regex
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(emailInput)) {
      emailErrorElement.innerText = "Invalid Email.";
      emailErrorElement.classList.add("error__message");
    } else {
      emailErrorElement.classList.remove("error__message");
      validationStatus = true;
    }
  }
  return validationStatus;
}

function validateText(
  id: string,
  errorDisplayId: string,
  length: number,
  itemName: string
): boolean {
  let validationStatus: boolean = false;

  const input = document.getElementById(id) as HTMLInputElement;
  const valueInput = input.value;
  const valueErrorElement = document.getElementById(errorDisplayId);

  if (!valueErrorElement) return validationStatus;

  if (valueInput.length <= length) {
    valueErrorElement.innerText = `${itemName} is too short.`;
    valueErrorElement.classList.add("error__message");
  } else {
    valueErrorElement.classList.remove("error__message");
    validationStatus = true;
  }
  return validationStatus;
}

function validatePhone(id: string, errorDisplayId: string): boolean {
  let validationStatus: boolean = false;

  const input = document.getElementById(id) as HTMLInputElement;
  const phoneNumberInput = input.value;
  const phoneNumberErrorElement = document.getElementById(errorDisplayId);

  if (!phoneNumberErrorElement) return validationStatus;

  if (phoneNumberInput.length <= 6) {
    phoneNumberErrorElement.innerText = "Phone number is too short.";
    phoneNumberErrorElement.classList.add("error__message");
  } else if (phoneNumberInput.length >= 16) {
    phoneNumberErrorElement.innerText = "Phone number is too long.";
    phoneNumberErrorElement.classList.add("error__message");
  } else {
    phoneNumberErrorElement.classList.remove("error__message");
    validationStatus = true;
  }
  return validationStatus;
}

async function sendEmail(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  subject: string,
  message: string
) {

  console.log(firstName,lastName,email,phone,subject,message)
  // const mailgun = new Mailgun(formData);
  // const mg = mailgun.client({
  //   username: "api",
  //   key: "f2c811e921c24dc6458eeabe89b5798d-3e508ae1-bdf44101",
  // });

  // mg.messages
  //   .create("sandbox-123.mailgun.org", {
  //     from: "Excited User <mailgun@sandbox-123.mailgun.org>",
  //     to: ["test@example.com"],
  //     subject: "Hello",
  //     text: "Testing some Mailgun awesomeness!",
  //     html: "<h1>Testing some Mailgun awesomeness!</h1>",
  //   })
  //   .then((msg) => console.log(msg)) // logs response data
  //   .catch((err) => console.log(err)); // logs any error
}
export default formValidator;
