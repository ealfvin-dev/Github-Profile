const inquirer = require("inquirer");
const axios = require("axios");

inquirer.prompt(
    [{
        message: "What is your GitHub username?",
        name: "username"
    },
    {
        message: "What is your favorite color?",
        name: "color"
    },
    {
        message: "What is the airspeed velocity of an unladen swallow?",
        name: "swallow"
    }
    ]).then(function(input) {
        const config = { headers: { accept: "application/json" } };

axios.get("https://api.github.com/users/" + input.username, config).then(function(response) {
    console.log(response);
    })
})