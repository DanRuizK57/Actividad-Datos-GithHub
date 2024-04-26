import { Octokit } from "octokit";
import dotenv from "dotenv";
import { writeFileSync } from "fs";

const issuesPerPage = 30;
// Aca uno elije la cantidad de issues que uno quiera ver
const numeroTotalIssues = 30;



dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function obtenerIssues(numeroTotalIssues) {
  const numeroPaginas = Math.ceil(numeroTotalIssues / issuesPerPage);
  let allIssues = [];
  try {
    for (let pageActual = 1; pageActual <= numeroPaginas; pageActual++) {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/issues",
        {
          owner: "godotengine",
          repo: "godot",
          page: pageActual,
        }
      );

      allIssues = allIssues.concat(response.data);
    }

    // Este daria los issues exactos ke se asignan,
    // ejemplo numeroTotalIssues = 265, esto retornara los 265
    // sin el slice retorna 270,
    return allIssues.slice(0, numeroTotalIssues);
  } catch (error) {
    console.error("Error al recuperar los issues:", error.message);
    return null;
  }
}

function filtrarInformacionDeIssues(issues) {
  return issues.map((issue) => {
    const {
      id,
      number,
      title,
      state,
      user,
      created_at,
      updated_at,
      body,
      labels,
    } = issue;

    const usuarioFiltrado = filtrarInformacionDeUsuario(user);

    return {
      id,
      number,
      title,
      state,
      user: usuarioFiltrado,
      created_at,
      updated_at,
      body,
      labels,
    };
  });
}

function filtrarInformacionDeUsuario(user) {
  const { login, id, type, site_admin } = user;

  return {
    login,
    id,
    type,
    site_admin,
  };
}


const issues = await obtenerIssues(numeroTotalIssues);
const issuesFiltrados = filtrarInformacionDeIssues(issues);


//aca dependiendo que se quiere transformar a un JSON, se cambia el listado
const jsonString = JSON.stringify(issues, null, 2);

try {
  writeFileSync("issues.json", jsonString);
  console.log("El archivo issues.json ha sido guardado correctamente.");
} catch (error) {
  console.error("Error al guardar el archivo:", error.message);
}

