const Octokit = require("octokit");

const octokit = new Octokit({ 
    auth: process.env.GITHUB_TOKEN
});

const obtenerIssues = async() => {
    await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: "octocat",
        repo: "Spoon-Knife",
    });
}

console.log(octokit);
  
  