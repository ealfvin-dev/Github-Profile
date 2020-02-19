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
            const username = input.username;
            const location = response.data.location;
            const gitHub = response.html_url;
            const blog = response.data.blog;
            const bio = response.data.bio;
            const numRepos = response.data.public_repos;
            const numFollowers = response.data.followers;
            const numFollowing = response.data.following;
            const reposURL = response.data.repos_url;

            axios.get(reposURL, config).then(function(repos) {
                for(let item of repos.data) {
                    console.log(item.stargazers_count);
                }
            });
        });
    });