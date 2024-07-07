import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import { getWeather } from "./getWeather.js";
const app = express(); // Create an express application
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Get the directory name of the current module

/* -------------------------------------------------------------------------------- */
// DEFINE ROUTES
// Express will go down the list of routes and stop when it finds a match so order matters

/* --------------*/
// STATIC FILES
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

/* --------------*/
// DYNAMIC PAGES - Set up HANDLEBARS template engine and views directory
app.set("view engine", "hbs");
// Set up custom path to views folder
app.set("views", path.join(__dirname, "../templates/views"));
// Define path to partials directory
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath); // Register partials directory with handlebars

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    pageName: "Homepage",
    message: "Go ahead punk, check the weather forecast",
    author: "MakeItBack",
  });
});

app.get("/weather", (req, res) => {
  res.render("weather", {
    title: "Weather",
    pageName: "Weather Page",
    message: "Enter a location to get the weather forecast",
    author: "MakeItBack",
  });
});

// API route for fetching weather data
app.get("/forecastdata", getWeather);

// Catch-all route for all other routes that don't exist
app.get("*", (req, res) => {
  res.render("notFound", {
    errorMessage: "Page not found",
    title: "404 Error",
    pageName: "404 Error",
    author: "MakeItBack",
  });
});

/* -------------------------------------------------------------------------------- */
// START THE SERVER

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
