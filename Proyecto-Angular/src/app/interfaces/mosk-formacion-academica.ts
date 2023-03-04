import { Educacion } from "./formacion-academica"

export const FormacionAcademica: Educacion[] = [ // Hacemos que la variable FormacionAcademica sea un array de interfaces Task, es decir que cada objeto tiene que cumplir con la estructura definida en la interfaz

    {
        id:1,
        nombre:"Tecnicatura Superior en Desarrollo Web y Aplicaciones Digitales",
        institucion: "Instituto Superior Politécnico Córdoba",
        fechaInicio:"Marzo 2022",
        fechaFin:"Julio 2024",
        descripcion: `Tecnicatura de 2 años y medio de duración en la que se ve desarrollo front-end con bootstrap y angular, 
                      y desarrollo back-end con python y django. También se aprende el trabajo en equipo mediante la realización
                      de un proyecto de sitio web aplicando la metodología ágil scrum`        
       
    },
    {
        id:2,
        nombre:"Curso Base de Datos - Python", 
        institucion: "Instituto Superior Politécnico Córdoba",
        fechaInicio:"Agosto 2022",
        fechaFin:"Diciembre 2022",
        descripcion:`Curso de 4 meses y medio de duración en el que se abordó la utilización de python para manejar bases de datos tanto relacionales (MySQL y SQL Server) 
                     como no relacionales (MongoDB), mediante el ORM SQLAlchemy. Aprendí el concepto de transacciones y de conectores, así como normalización de una base
                     de datos relacional, junto con la realización de diagramas UML para su diseño, como el entidad-relación.`,    
        urlCertificado: "",
    } 
]