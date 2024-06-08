"use strict";

const ContentSecurityPolicy = `
  default-src 'self' blob:;
  script-src 'self' blob:;
  connect-src 'self' blob:;
  font-src 'self' data:;
  img-src 'self' blob: data:;
  style-src 'self' 'unsafe-inline';
  frame-ancestors 'self';
  form-action 'self';
  object-src 'self' data: blob:; 
  worker-src 'self' blob:;
  frame-src 'self' blob:;
  media-src 'self' data: blob:;
`;

export const config = {
  HOST: process.env.APP_HOST,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  mysql: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
  },

  "Content-Security-Policy": ContentSecurityPolicy.replace(
    /\s{2,}/g,
    " "
  ).trim(),
  "X-Content-Security-Policy": ContentSecurityPolicy.replace(
    /\s{2,}/g,
    " "
  ).trim(),

  "Cache-Control": "no-cache, must-revalidate, private s-maxage=0",

  "Referrer-Policy": "no-referrer",

  "X-Frame-Options": "SAMEORIGIN",

  "X-XSS-Protection": "1; mode=block",

  "X-Content-Type-Options": "nosniff",

  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};
