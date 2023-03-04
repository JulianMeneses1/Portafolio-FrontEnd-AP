import { Proyecto } from "./proyecto"

export const Proyectos: Proyecto[] = [ // Hacemos que la variable Conocimientos sea un array de interfaces Task, es decir que cada objeto tiene que cumplir con la estructura definida en la interfaz

    {
        id:1,
        nombre:"Base de Datos Universidad",        
        imagen: "../assets/Base de datos.png",
        descripcion: `Una base de datos relacional para una universidad ficticia que incluye diversos reportes. Ha sido construida en MySQL, utilizando Python y el ORM SQLAlchemy.`,
        urlGitHub: "https://github.com/JulianMeneses1/Proyecto-Base-de-Datos-PIL",
        tecnologias: ["Python", "SQLAlchemy", "MySQL"],
  
    },
    {
        id:2,
        nombre:"Psico Finder",        
        imagen: "../assets/Psico Finder.png",
        descripcion: `Un proyecto colectivo de un sitio web en donde podés encontrar el profesional de la salud mental que mejor se ajuste a tus preferencias. 
                      En este proyecto estuve a cargo de la mayor parte del diseño así como de la validación de
                      los formularios de registro de usuarios y profesionales.`,
        urlGitHub: "https://github.com/oliverio97/Proyecto-integrador---ISPC",
        urlSitioWeb: "https://oliverio97.github.io/Proyecto-integrador---ISPC/Front%20End%20(Vista)/index.html",
        tecnologias: ["HTML", "CSS", "Bootstrap", "JavaScript"],
            
    } 
]