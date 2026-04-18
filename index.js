/**
 * Launcher
 * Web Performance Lab
 *
 * Maintained by Muhmmad Medhat.
 *
 * My goal for this application is to make it a fully-documented example of a
 * *very* simple web application using basic tools and libraries.
 *
 * This is the main launcher, which just spins up the application on our running
 * port.
 */

const app = require("./src/app");

app.listen(3000, () => {
  console.log("Web server is ready at http://localhost:3000/");
});
