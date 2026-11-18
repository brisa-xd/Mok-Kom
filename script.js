let publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];//el array que guarda las publicaciones//

function guardarPublicaciones() {
    localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
}

let siguienteId = 1;

const publicacionesIniciales = document.querySelectorAll(//tener las publicaciones que ya están en el HTML//
    "#listadePublicaciones .publicacion"
);

publicacionesIniciales.forEach((elemento) => {//que las primeras publicaciones se guarden en el array//

    const textos = elemento.querySelectorAll("p");
    const categoriaTexto = textos[1]?.textContent || "";
    const categoria = categoriaTexto.replace("Categoría:", "").trim();

    publicaciones.push({
        id: siguienteId++,
        usuario: elemento.querySelector("h3").textContent,
        contenido: textos[0].textContent.trim(),
        categoria: categoria,
        likes: Number(
            elemento.querySelector(".cantidadelikes").textContent
        )
    });
});
const listaPublicaciones = document.getElementById(//los elementos que estan en el HTML//
    "listadePublicaciones"
);
const formularioPublicacion = document.getElementById(
    "formpublicacion"
);
const filtroCategoria = document.getElementById(
    "filtroCategoria"
);
const mensajePublicacion = document.getElementById(
    "mensajePublicacion"
);

function mostrarPublicaciones() { //Para que las publicaciones se muetsren//

    listaPublicaciones.textContent = "";

    const filtro = filtroCategoria.value;

    const publicacionesFiltradas = publicaciones.filter((publicacion) => {

        return filtro === "Todas" ||
            publicacion.categoria === filtro;

    });
    if (publicacionesFiltradas.length === 0) {

        const mensaje = document.createElement("p");

        mensaje.textContent = "Todavía no hay publicaciones en esta categoría.";

        listaPublicaciones.appendChild(mensaje);

        return;
    }
    publicacionesFiltradas.forEach((publicacion) => {
        const articulo = document.createElement("article");//para crear una tarjeta//

        articulo.classList.add("publicacion");

        articulo.dataset.id = publicacion.id;

        const nombre = document.createElement("h3");//cuando el usuario coloque su nombre de usuario//
        
        nombre.textContent = publicacion.usuario;

        const contenido = document.createElement("p");// la informacion que pondra el usuario//
                                                       
        contenido.textContent = publicacion.contenido;

        const categoria = document.createElement("p");//la categoria de la cual quiere hablar el usuario//

        categoria.classList.add("categoria");

        categoria.textContent = "Categoría: " + publicacion.categoria;

        
        const botonLike = document.createElement("button");//el boton de me gusta//

        botonLike.type = "button";

        botonLike.classList.add("botonLike");

        botonLike.textContent = "Me gusta";


        const cantidadLikes = document.createElement("span")//la cantidad de likes//

        cantidadLikes.classList.add("cantidadelikes");

        cantidadLikes.textContent = publicacion.likes;

   
        const textoLikes = document.createElement("span");  // el texto de "Me gusta"//

        textoLikes.textContent = " Me gusta";

        
        const botonEliminar = document.createElement("button");//el boton de eliminar publicacion//

        botonEliminar.type = "button";

        botonEliminar.classList.add("boton-eliminar");

        botonEliminar.textContent = "Eliminar";

        
        articulo.appendChild(nombre);//los elementos de la tarjeta//
        articulo.appendChild(contenido);
        articulo.appendChild(categoria);
        articulo.appendChild(botonLike);
        articulo.appendChild(cantidadLikes);
        articulo.appendChild(textoLikes);
        articulo.appendChild(botonEliminar);

        listaPublicaciones.appendChild(articulo);

    });

}

formularioPublicacion.addEventListener("submit", function(evento) {//Para hacer una  publicación//

    evento.preventDefault();

    const usuario = document.getElementById(
        "nombreUsuario"
    ).value.trim();

    const contenido = document.getElementById(
        "contenidoPublicacion"
    ).value.trim();

    const categoria = document.getElementById(
        "categoriaPublicacion"
    ).value;

  
    if (usuario === "" || contenido === "") { //Que el usuario complete los campos obligatoriamente//

        mensajePublicacion.textContent =
            "Por favor, completa todos los campos.";

        return;
    }

    const nuevaPublicacion = {//Crear una publicación//

        id: siguienteId++,
        usuario: usuario,
        contenido: contenido,
        categoria: categoria,
        likes: 0

    };
    publicaciones.unshift(nuevaPublicacion); //para agregar al array//

    mostrarPublicaciones(); //actualizar la página//

    formularioPublicacion.reset();//Vacia el formulario //

    mensajePublicacion.textContent =
        "¡Tu publicación se agregó correctamente! ⭐";

});

listaPublicaciones.addEventListener("click", function(evento) {//Dar like y eliminar publicaciones//

    const tarjeta = evento.target.closest(".publicacion");

    if (!tarjeta) {
        return;
    }

    const id = Number(tarjeta.dataset.id);

    const publicacion = publicaciones.find((elemento) => {//Para buscar una publicacion//

        return elemento.id === id;

    });

    if (!publicacion) {
        return;
    }

    if (evento.target.classList.contains("botonLike")) {//dar un like//

        publicacion.likes++;

        mostrarPublicaciones();

    }

    if (evento.target.classList.contains("boton-eliminar")) {  //para eliminar un publicacion//

        publicaciones = publicaciones.filter((elemento) => {

            return elemento.id !== id;

        });

        mostrarPublicaciones();

    }
});

filtroCategoria.addEventListener("change", mostrarPublicaciones);//Filtro de las publicaciones para que salgan por categoría//

mostrarPublicaciones();//que muestre las publicaciones al iniciar la página//

let apuntes = [];//array de los apuntes//

const formularioApunte = document.getElementById(
    "formApunte"
);

const listaApuntes = document.getElementById(
    "lista-apuntes"
);


function mostrarApuntes() {//mostrar los apuntes en la página//

    listaApuntes.textContent = "";

    if (apuntes.length === 0) {

        const mensaje = document.createElement("p");

        mensaje.textContent = "Todavía no tienes apuntes guardados.";

        listaApuntes.appendChild(mensaje);

        return;
    }

    apuntes.forEach((apunte) => {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("apunte");

        const titulo = document.createElement("h4");

        titulo.textContent = apunte.titulo;

        const contenido = document.createElement("p");

        contenido.textContent = apunte.contenido;

        const botonEliminar = document.createElement("button");

        botonEliminar.type = "button";

        botonEliminar.textContent = "Eliminar apunte";

        botonEliminar.addEventListener("click", function() {

            apuntes = apuntes.filter((elemento) => {

                return elemento.id !== apunte.id;

            });

            mostrarApuntes();

        });

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(contenido);
        tarjeta.appendChild(botonEliminar);

        listaApuntes.appendChild(tarjeta);

    });

}

formularioApunte.addEventListener("submit", function(evento) {//que se guarde un apunte hecho por el usuario//

    evento.preventDefault();

    const titulo = document.getElementById(
        "titulo"
    ).value.trim();

    const contenido = document.getElementById(
        "contenido"
    ).value.trim();

    if (titulo === "" || contenido === "") {
        return;
    }

    const nuevoApunte = {

        id: Date.now(),
        titulo: titulo,
        contenido: contenido

    };

    apuntes.push(nuevoApunte);

    mostrarApuntes();

    formularioApunte.reset();

});

mostrarApuntes();//mostrar un mensaje inicial//

let flashcards = [];// el array de las trajetas//

const formularioFlashcard = document.getElementById(
    "formcards"
);

const listaFlashcards = document.getElementById(
    "lista-flashcards"
);

function mostrarFlashcards() {// que los flashcards se muestren//

    listaFlashcards.textContent = "";

    if (flashcards.length === 0) {

        const mensaje = document.createElement("p");

        mensaje.textContent = "Todavía no tienes tarjetas de estudio.";

        listaFlashcards.appendChild(mensaje);

        return;
    }

    flashcards.forEach((tarjeta) => {

        const contenedor = document.createElement("article");

        contenedor.classList.add("flashcard");

        const pregunta = document.createElement("h4");

        pregunta.textContent = tarjeta.pregunta;

        const respuesta = document.createElement("p");

        respuesta.classList.add("respuesta");

        respuesta.textContent = "Presiona el botón para ver la respuesta.";
// boton para que se muetsre la respuesta puesta por el usuario//
        const botonRespuesta = document.createElement("button"); 

        botonRespuesta.type = "button";

        botonRespuesta.textContent = "Ver respuesta";

        let respuestaVisible = false;

        botonRespuesta.addEventListener("click", function() {

            respuestaVisible = !respuestaVisible;

            if (respuestaVisible) {

                respuesta.textContent = tarjeta.respuesta;

                botonRespuesta.textContent = "Ocultar respuesta";

            } else {

                respuesta.textContent =
                    "Presiona el botón para ver la respuesta.";

                botonRespuesta.textContent = "Ver respuesta";

            }

        });

        const botonEliminar = document.createElement("button"); // boton para que puedan eliminar tal flashcard//

        botonEliminar.type = "button";

        botonEliminar.textContent = "Eliminar tarjeta";

        botonEliminar.addEventListener("click", function() {

            flashcards = flashcards.filter((elemento) => {

                return elemento.id !== tarjeta.id;

            });

            mostrarFlashcards();

        });

        contenedor.appendChild(pregunta);
        contenedor.appendChild(respuesta);
        contenedor.appendChild(botonRespuesta);
        contenedor.appendChild(botonEliminar);

        listaFlashcards.appendChild(contenedor);

    });

}

// que puedan crear un flashcard//
formularioFlashcard.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const pregunta = document.getElementById(
        "pregunta"
    ).value.trim();

    const respuesta = document.getElementById(
        "respuesta"
    ).value.trim();

    if (pregunta === "" || respuesta === "") {
        return;
    }

    const nuevaFlashcard = {

        id: Date.now(),
        pregunta: pregunta,
        respuesta: respuesta

    };

    flashcards.push(nuevaFlashcard);

    mostrarFlashcards();

    formularioFlashcard.reset();

});


mostrarFlashcards();// mostrar tarjetas iniciales//

// mensaje en la consola//
console.log("¡Bienvenido a MOK KOM! ⭐");
console.log("Eres muy especial :).");
