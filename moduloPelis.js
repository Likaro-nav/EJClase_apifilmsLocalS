const fetch = require ("node-fetch");
const bbdd = require("./modulos/m_bbdd.js");




// Método para llamar a la API 
exports.getapiFilms = (req, res) => {
    const titulo = req.params.titulo;
    fetch(`http://www.omdbapi.com/?t=${titulo}&apikey=12267320`)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
    res.json(data);
    })
    .catch((e)=>{
        console.log("error"+e)
    })
}

// Renderiza el HOME y buscar las películas favolitas desde el Buscador.
exports.getBuscador = (req, res) => {
    bbdd.leerDocPeli(req)
    .then((datos)=> {
        res.render ("home", {title: "Bienvenido/a.", message: "BIENVENIDO", 
        datos})
    })
    .catch((e)=> console.log("ocurrió un error:"+e))

}

// Método para los campos a editar del FORM de las películas desde la BBDD.
exports.getPeliEditar = (req, res) => {
    bbdd.detalleDocPeli(req.params.titulo)
    .then((datos)=> {
        console.log(datos)
        res.render("form", {
            ruta:"/films/edit",
            titulo1: "¿Qué película desea actualizar?",
            _id: datos._id,
            tituloEdit: datos.Titulo, 
            epocaEdit: datos.Epoca, 
            generoEdit: datos.Genero, 
            directorEdit: datos.Director, 
            actorsEdit: datos.Actores, 
            sinopsisEdit: datos.Sinopsis,
            idiomasEdit: datos.Idiomas,
            puntuacionEdit: datos.Puntuacion, 
            produccionEdit: datos.Produccion,
            imagenEdit: datos.Poster
        }) })
    .catch((e)=> console.log("ocurrió un error:"+e))

}


// Metodo para mostar en detalle de las películas en el pug PELICULAS. 
exports.getPeliDetalle = (req, res) => {
    bbdd.detalleDocPeli(req.params.titulo)
    .then((datos)=> {   
        res.render("pelicula", {
            tituloPeli: datos.Titulo, 
            epocaPeli: datos.Epoca, 
            generoPeli: datos.Genero,
            peliDirector: datos.Director, 
            actorPeli: datos.Actores,
            sinopsisPeli: datos.Sinopsis,
            idiomasPeli: datos.Idiomas, 
            puntuacionPeli: datos.Puntuacion, 
            producterPeli: datos.Produccion,
            Poster: datos.Poster
        })

    })
    .catch((e)=> console.log("Ha ocurrido un problema:"+e))
}

// Método para renderizar los datos de la API en un PUG.
exports.getpeliFinal = (req, res) => {
    const titulo = req.params.titulo;
    fetch(`http://www.omdbapi.com/?t=${titulo}&apikey=12267320`)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
        res.render("pelicula", {
            mensaje: "La película de su eleección ",
            tituloPeli: data.Title,
            epocaPeli: data.Year,
            generoPeli: data.Genre,
            peliDirector: data.Director,
            actorPeli: data.Actors,
            sinopsisPeli: data.Plot,
            idiomasPeli: data.Language,
            puntuacionPeli: data.imdbRating,
            productorPeli: data.Production,
            Poster: data.Poster,
        });
    });
}


// Método para renderizar el formulario de "Guardar favoritos"
exports.getForm = (req, res) => { 
    res.render("form", {titulo1: "¿Qué película desea guardar?.", ruta: "/api/films"})
    
}

// Método para mostar el PUG Error 404.
exports.getError = (req, res) => {
    res.status(404).render("error", {title: "Oh, lo siento, tienes un error 404"});
}

// Método POST para crear un nuevo documento en la BBDD.
exports.posapiFilms = (req, res) => {
    bbdd.crearDocPeli( req.body)
    .then(() => {
      res.status(200).render("exito", {title: "Enviado con éxito", message: "Tu formulario se ha enviado con éxito"});
    })
    .catch((e)=> console.log("ocurrió un error:"+e))
}

// Método para editar y actualizar los documentos del FORM. 
exports.posEditar = (req, res) => {
    let _id = req.body.id
    console.log("PASO 2 ++++++++++++++++++++++++++++++++++")
    console.log(_id)
    bbdd.editarDocPeli(_id, req.body)
    .then(()=> {
        res.status(200).render("exito", {title: "Documento actualizado", message: "Se ha actualizado con éxito "})
    })
    .catch((e)=> console.log("ocurrió un error inesperad:;"+e))
}

//Método POST para borrar un documento de la BBDD.
exports.postDeleteFilms = (req, res) => {
    bbdd.borrarDocPeli (req.body)
    .then(() => {
        res.status(200).render("exito")
    })
    .catch((e) => console.log("ocurrió un error"+e))
}
