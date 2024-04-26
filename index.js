import { Octokit } from "octokit";
import dotenv from "dotenv";
import * as fs from 'fs';
import path from 'path';
//import hola from ""

dotenv.config();
let issuesData = [];
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

const obtenerIssues = async () => {
    let issues = [];
    let mensaje;
    for (let index = 0; index < 36; index++) {
        mensaje = await octokit.request("GET /repos/{owner}/{repo}/issues?page={$index}", {
            owner: "godotengine",
            repo: "godot",
        });

        issues.push(mensaje.data);


    }

    return issues;
}
const crearJson = async () => {
    try {
        const issuesData = await obtenerIssues();
        console.log(issuesData); // Imprimir los datos obtenidos
        await fs.promises.writeFile("./thing.json", JSON.stringify(issuesData, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
};

crearJson();

