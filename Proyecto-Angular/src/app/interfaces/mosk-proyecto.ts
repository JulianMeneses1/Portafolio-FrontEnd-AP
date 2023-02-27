import { Proyecto } from "./proyecto"

export const Proyectos: Proyecto[] = [ // Hacemos que la variable Conocimientos sea un array de interfaces Task, es decir que cada objeto tiene que cumplir con la estructura definida en la interfaz

    {
        id:1,
        nombre:"Base de Datos Universidad",        
        imagen: "../assets/HTML.png",
        descripcion: "Base de datos hecha con el ORM SQL Alchemy y Python",
        urlGitHub: "",
        tecnologias: ["Python", "SQLAlchemy", "MySQL"]   
    },
    {
        id:2,
        nombre:"Psico Finder",        
        imagen: "../assets/CSS.png",
        descripcion: "Sitio web para buscar profesionales de la salud mental y contactarlos" ,
        urlGitHub: "",
        urlSitioWeb: "",
        tecnologias: ["HTML", "CSS", "Bootstrap", "JavaScript"]              
    } 
]