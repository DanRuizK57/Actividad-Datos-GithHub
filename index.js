import { Octokit } from "octokit";
import dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit({ 
    auth: process.env.GITHUB_TOKEN
});

const obtenerIssues = async() => {
    await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: "godot",
        repo: "godotengine",
    });
}

console.log(octokit);
  
  