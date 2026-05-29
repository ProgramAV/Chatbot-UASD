
async function enviarMensaje() {

    const input = document.getElementById("mensaje");

    const mensaje = input.value.trim();

    if(mensaje === "") return;

    const chat = document.getElementById("chat");

    // Mensaje usuario
    chat.innerHTML += `

        <div class="message user-message">
            <div class="message-content">
                ${mensaje}
            </div>
        </div>
    `;

    // Loader
    chat.innerHTML += `

        <div class="message bot-message" id="loader">
            <div class="message-content">
                Escribiendo...
            </div>
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;

    input.value = "";

    try {

        const respuesta = await fetch(
            "http://localhost:3000/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mensaje: mensaje
                })
            }
        );

        const data = await respuesta.json();

        document.getElementById("loader").remove();

        chat.innerHTML += `

            <div class="message bot-message">
                <div class="message-content">
                    ${data.respuesta}
                </div>
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;

    } catch(error) {

        document.getElementById("loader").remove();

        chat.innerHTML += `

            <div class="message bot-message">
                <div class="message-content">
                    Ocurrió un error en el servidor.
                </div>
            </div>
        `;
    }
}

function usarPregunta(boton) {

    document.getElementById("mensaje").value =
        boton.innerText;

    enviarMensaje();
}