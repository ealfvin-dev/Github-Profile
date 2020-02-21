const inquirer = require("inquirer");
const axios = require("axios");

const pdf = require("html-pdf");

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
            const color = input.color;

            const username = input.username;
            const image = response.data.avatar_url;

            const location = response.data.location;
            const gitHub = response.data.html_url;

            const blog = response.data.blog;
            const bio = response.data.bio;

            const numRepos = response.data.public_repos;

            const numFollowers = response.data.followers;
            const numFollowing = response.data.following;

            const reposURL = response.data.repos_url;

            let numStars = 0;

            axios.get(reposURL, config).then(function(repos) {
                for(let repo of repos.data) {
                    numStars += repo.stargazers_count;
                }
            });

            let htmlContent = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Profile</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                
                <style>
                    body {
                        background-color: ${color};
                    }

                    p {
                        font-size: 9pt;
                    }

                    .lead {
                        font-size: 11pt;
                    }
                </style>
            </head>
            <body>
                <div class="jumbotron">
                    <h4 class="display-4">${username}</h4>
                    <p class="lead">blog: ${blog}</p>
                    <hr class="my-4">
                    <p id="bio">${bio}</p>
                </div>

                <div class="image">
                    <img src="${image}" width="20%" alt="Profile image"/>
                </div>

                <div id="content">
                    <p>
                        GitHub: ${gitHub}
                    </p>
                    <p>
                        Number of repositories: ${numRepos}
                    </p>
                    <p>
                        Number of stars: ${numStars}
                    </p>
                    <p>
                        Number of followers: ${numFollowers}
                    </p>
                    <p>
                        Number following: ${numFollowing}
                    </p>
                    <p>
                        Location: ${location}
                    </p>
                </div>

            </body>`;

            //Convert to pdf
            const options = { "orientation": "portrait" };

            pdf.create(htmlContent, options).toFile("./" + username + ".pdf", function(err, res) {
                if(err){
                    console.log(err);
                    return
                }
            });
        });
    });