const express = require("express");
const cors = require("cors");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const natural = require("natural");

const app = express();

app.use(cors());
app.use(express.json());

let parrafosPDF = [];

// Cargar PDF
async function cargarPDF() {

    const dataBuffer =
        fs.readFileSync("estatuto.pdf");

    const data =
        await pdfParse(dataBuffer);

    // Dividir el PDF en párrafos
    parrafosPDF = data.text
        .split("\n")
        .filter(p => p.trim() !== "");

    console.log("PDF cargado correctamente");
}

cargarPDF();

app.post("/chat", async (req, res) => {


    /*const respuestas = [
    {
        palabras: ["mision", "misión"],
        respuesta:
            "La misión de la UASD es contribuir a la transformación de la sociedad mediante la formación de profesionales, la investigación científica y la extensión universitaria."
    },

    {
        palabras: ["fines", "objetivos"],
        respuesta:
            "Los fines de la UASD incluyen formar profesionales competentes, promover la investigación, difundir la cultura y contribuir al desarrollo nacional."
    },

    {
        palabras: ["claustro mayor"],
        respuesta:
            "El Claustro Mayor es la máxima autoridad de gobierno de la Universidad Autónoma de Santo Domingo."
    }
    ];

    for (const item of respuestas) {

    for (const palabra of item.palabras) {

        if (pregunta.includes(palabra)) {

            return res.json({
                respuesta: item.respuesta
            });
        }
    }
}*/

    const pregunta =
        req.body.mensaje.toLowerCase();

    // Conversación básica
    if (pregunta.includes("hola")) {

        return res.json({
            respuesta:
                "¡Hola! Soy el asistente virtual del Estatuto Orgánico de la UASD. ¿En qué puedo ayudarte?"
        });
    }

    if (pregunta.includes("gracias")) {

        return res.json({
            respuesta:
                "¡De nada! Estoy para ayudarte."
        });
    }

    // Preguntas importantes entrenadas

    if (
        pregunta.includes("misión", "mision")
    ) {

        return res.json({
            respuesta:
                "La misión de la UASD es contribuir a la transformación de la sociedad mediante la formación de profesionales, la investigación científica y la extensión universitaria."
        });
    }

    if (
        pregunta.includes("fines")
    ) {
 
        return res.json({
            respuesta:
                "Los fines de la UASD incluyen formar profesionales competentes, promover la investigación, difundir la cultura y contribuir al desarrollo nacional."
        });
    }

    if (
        pregunta.includes("claustro mayor")
    ) {

        return res.json({
            respuesta:
                "El Claustro Mayor es la máxima autoridad de gobierno de la Universidad Autónoma de Santo Domingo."
        });
    }

    if (
        pregunta.includes("consejo universitario")
    ) {

        return res.json({
            respuesta:
                "El Consejo Universitario es el organismo ejecutivo de gobierno encargado de dirigir y administrar la UASD."
        });
    }

    if (
        pregunta.includes("rector")
    ) {

        return res.json({
            respuesta:
                "El Rector es la máxima autoridad ejecutiva de la Universidad y representa legalmente a la UASD."
        });
    }

    if (
        pregunta.includes("estudiantes")
    ) {

        return res.json({
            respuesta:
                "El Estatuto establece derechos y deberes para los estudiantes, así como mecanismos de representación estudiantil."
        });
    }

    if (
        pregunta.includes("Universidad Autónoma de Santo Domingo")
    ) {

        return res.json({
            respuesta:
                "La Universidad Autónoma de Santo Domingo es una institución pública y descentralizada del Estado, con autonomía garantizada por la Constitución de la República, que se sustenta en un modelo de Universidad Nacional."
        });
    }


    // Búsqueda inteligente para preguntas libres

    let mejorParrafo = "";
    let mejorCoincidencia = 0;

    parrafosPDF.forEach(parrafo => {

        let coincidencias = 0;

        const palabras =
            pregunta.split(" ");

        palabras.forEach(palabra => {

            if (
                palabra.length > 4 && 
                parrafo
                    .toLowerCase()
                    .includes(palabra)
            ) {
                coincidencias++;
            }
        });

        if (
            coincidencias >
            mejorCoincidencia
        ) {

            mejorCoincidencia =
                coincidencias;

            mejorParrafo = parrafo;
        }
    });

    if (
        mejorCoincidencia === 0
    ) {

        mejorParrafo =
            "No encontré información específica sobre esa pregunta en el Estatuto Orgánico de la UASD.";
    }

    res.json({
        respuesta:
            mejorParrafo.substring(0, 800)
    });
});

app.listen(3000, () => {

    console.log(
        "Servidor corriendo en puerto 3000"
    );
});