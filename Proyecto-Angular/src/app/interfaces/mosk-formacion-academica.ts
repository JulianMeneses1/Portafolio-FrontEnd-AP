

export const FormacionAcademica = [ // Hacemos que la variable FormacionAcademica sea un array de interfaces Task, es decir que cada objeto tiene que cumplir con la estructura definida en la interfaz

    {
        id:1,
        nombre:"Desarrollo Web y Aplicaciones Digitales",
        institucion: "Instituto Superior Politécnico Córdoba",
        fechaInicio:"Marzo 2022",
        fechaFin:"Actualidad",
        descripcion: `Tecnicatura de 2 años y medio de duración en donde aprendo los principales conceptos de desarrollo web Front End y Back End,
                      empleando las siguientes tecnologías: HTML, CSS, TypeScript, Python y MySQL, y como frameworks usamos Bootstrap, Angular y Django. Todos estos conocimientos los aplicamos 
                      en la elaboración grupal de un proyecto de sitio web aplicando la metodología Scrum`,
        urlInstitucion: "https://www.ispc.edu.ar/",
        imagen: "../assets/Logo ISPC.jpeg"       
       
    },    
    {
        id:2,
        nombre:"Desarrollo Web Full Stack", 
        institucion: "Argentina Programa",
        fechaInicio:"Octubre 2022",
        fechaFin:"Actualidad",
        descripcion:`Curso de 7 meses de duración en en donde aprendo los principales conceptos de desarrollo web Front End y Back End,
                    empleando las siguientes tecnologías: HTML, CSS, TypeScript, Java y MySQL, y como frameworks usamos Bootstrap, Angular y Sping Boot. Todos estos conocimientos los aplico 
                    en la elaboración de un Portfolio Web con una base de datos y un login.`,    
        urlCertificado: "",
        urlInstitucion: "https://www.argentina.gob.ar/economia/conocimiento/argentina-programa",
        imagen: "../assets/Logo Argentina Programa.png"
    },
    {
        id:3,
        nombre:"Base de Datos - Python", 
        institucion: "Instituto Superior Politécnico Córdoba",
        fechaInicio:"Agosto 2022",
        fechaFin:"Diciembre 2022",
        descripcion:`Curso de 4 meses y medio de duración en el que aprendí a utilizar python para manejar bases de datos tanto relacionales (MySQL y SQL Server) 
                     como no relacionales (MongoDB), mediante el ORM SQLAlchemy. Esto incluyó conceptos como transacciones y conectores, así como normalización de una base
                     de datos relacional, junto con la realización de diagramas UML para su diseño, como el entidad-relación.`,    
        urlCertificado: "https://drive.google.com/file/d/10vfbd4T20DkA1T1G7JtIXmovFomPmrqK/view",
        urlInstitucion: "https://www.ispc.edu.ar/",
        imagen: "../assets/Logo ISPC.jpeg"
    },
    {
        id:4,
        nombre:"Profesorado de Historia", 
        institucion: "Universidad Nacional de Córdoba",
        fechaInicio:"Marzo 2018",
        fechaFin:"Marzo 2023",
        descripcion:`Profesor de historia. Título otorgado por la Facultad de Filosofía y Humanidades - UNC. Promedio: 9.32`,    
        urlCertificado: "",
        urlInstitucion: "https://www.unc.edu.ar/",
        imagen: "../assets/Logo UNC.jpg"
    }  
]