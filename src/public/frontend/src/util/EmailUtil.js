// /* eslint-disable @typescript-eslint/no-var-requires */
// import emailConfig from "../..";
// const mailgun = require("mailgun-js")(emailConfig);

// // const mailgun = Mailgun(emailConfig);÷\

// const sendEmail = (recipient, message, attachment) =>
//   new Promise((resolve, reject) => {
//     const data = {
//       from: "Gobinda Thakur <info@mg.gobindathakur.com>",
//       to: recipient,
//       subject: message.subject,
//       text: message.text,
//       inline: attachment,
//       html: message.html,
//     };

//     mailgun.messages().send(data, (error) => {
//       if (error) {
//         return reject(error);
//       }
//       return resolve();
//     });
//   });

// sendEmail("thomasalexmech@gmail.com", "Hello bro", "")
//   .then(() => console.log("Done"))
//   .catch((err) => console.log(err));
