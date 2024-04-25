import { Octokit } from "octokit";
import dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

const obtenerIssues = async () => {
    let issues = [];
    for (let index = 0; index < 36; index++) {
        issues.push(await octokit.request("GET /repos/{owner}/{repo}/issues?page={$index}", {
            owner: "godotengine",
            repo: "godot",
        }));

    }

    return issues;
}
//paginacion
const obtenerPaginacione = async () => {


}
console.log(await obtenerIssues());

