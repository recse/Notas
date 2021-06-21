const añadirBtn = document.getElementById("añadir");

const notas = JSON.parse(localStorage.getItem("notas"));

if (notas) {
    notas.forEach((nota) => {
        añadirNuevaNota(nota);
    });
}

añadirBtn.addEventListener("click", () => {
    añadirNuevaNota();
});

function añadirNuevaNota(text = "") {
    const nota = document.createElement("div");
    nota.classList.add("nota");

    nota.innerHTML = `
        <div class="notas">
            <div class="opciones">
                <button class="editar"><i class="fas fa-edit"></i></button>
                <button class="borrar"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "ocultar"}"></div>
            <textarea class="${text ? "ocultar" : ""}"></textarea>
        </div>
    `;

    const editarBtn = nota.querySelector(".editar");
    const borrarBtn = nota.querySelector(".borrar");

    const main = nota.querySelector(".main");
    const textArea = nota.querySelector("textarea");

    textArea.value = text;
    main.innerHTML = marked(text);

    editarBtn.addEventListener("click", () => {
        main.classList.toggle("ocultar");
        textArea.classList.toggle("ocultar");
    });

    borrarBtn.addEventListener("click", () => {
        nota.remove();

        actualizar();
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value);

        actualizar();
    });

    document.body.appendChild(nota);
}

function actualizar() {
    const textoNotas = document.querySelectorAll("textarea");

    const notas = [];

    textoNotas.forEach((nota) => {
        notas.push(nota.value);
    });

    localStorage.setItem("notas", JSON.stringify(notas));
}