import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import moment from "moment";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export * from "./manga";
export const createMailVerificationTemplate = (verifyLink: string) => {
    return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet">
  
      <style>
          * {
              font-family: 'Poppins', sans-serif;
              font-size: 0.875rem;
  
          }
  
          .container> :not([hidden])~ :not([hidden]) {
              margin-top: 8px;
              margin-bottom: 8px;
          }
  
          .link {
              color: #0000EE;
          }
      </style>
  </head>
  
  <body>
  
      <div class="container">
          <div>
              Someone has created a MangaDex account with this email address. If this was you, click the link below to
              verify
              your email address.
          </div>
          <div>
              <a class="link" href="${verifyLink}">Link to e-mail address verification</a>
          </div>
          <div>
              This link will expire within 1 hour.
          </div>
          <div>
              If you didn't create this account, just ignore this message.
  
          </div>
      </div>
  
  </body>
  
  </html>`;
};

export const generateVerifyMailToken = async (payload: {
    email: string;
    _id: string;
    username: string;
}) => {
    const token = await jwt.sign(
        payload,
        process.env.EMAIL_VERIFICATION_SECRET,
        { expiresIn: "1h" }
    );

    return token;
};

export const verifyMailToken = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.EMAIL_VERIFICATION_SECRET,
            (err, decode) => {
                if (err) return reject(err);
                return resolve(decode);
            }
        );
    });
};

export const timeAgoFormat = (date: string) => {
    return moment(date).fromNow();
};

export function getCurrentSeasonTimeString() {
    const date = new Date();
    const currentMonth = date.getMonth() + 1; // Months are zero-indexed, so add 1

    if (currentMonth >= 3 && currentMonth <= 5) {
        const startMonth = 3;
        return `${date.getFullYear()}-${startMonth}-01T00:00:00`;
    } else if (currentMonth >= 6 && currentMonth <= 8) {
        const startMonth = 6;
        return `${date.getFullYear()}-${startMonth}-01T00:00:00`;
    } else if (currentMonth >= 9 && currentMonth <= 11) {
        const startMonth = 11;
        return `${date.getFullYear()}-${startMonth}-01T00:00:00`;
    } else {
        const startMonth = 12;
        return `${date.getFullYear()}-${startMonth}-01T00:00:00`;
    }
}

export const getTimeAgo = (day: number) => {
    const currentDateTime: Date = new Date();

    // Calculate the date and time for 2 week ago
    const timeAgo: Date = new Date(currentDateTime);
    timeAgo.setDate(timeAgo.getDate() - day);
    timeAgo.setUTCHours(0, 0, 0, 0);
    // Format the date and time string
    const formattedDateTime: string = timeAgo.toISOString().slice(0, 19);
    return formattedDateTime;
};

export const slugify = (str: string) => {
    return String(str)
        .normalize("NFKD") // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-"); // remove consecutive hyphens
};
