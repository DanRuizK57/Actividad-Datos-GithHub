import { Octokit } from "octokit";
import dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit({ 
    auth: process.env.GITHUB_TOKEN
});

const obtenerIssues = async() => {
    return await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: "godotengine",
        repo: "godot",
    });
}

console.log(await obtenerIssues());
  
  