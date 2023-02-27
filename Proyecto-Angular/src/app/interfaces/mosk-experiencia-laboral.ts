import { Experiencia } from "./experiencia-laboral"

export const Experiencias: Experiencia[] = [ // Hacemos que la variable Experiencias sea un array de interfaces Task, es decir que cada objeto tiene que cumplir con la estructura definida en la interfaz

    {
        id: 1,
        puesto: "App Developer (Power Platform)",
        empresa: "Procom IT Solutions",
        urlEmpresa: "https://procomitsolutions.com/es",
        fechaInicio: "Septiembre 2022",
        fechaFin: "Actualidad",
        descripcion: `Me desempeño como desarrollador de apps para escritorio y móviles a través de las herramientas Power Apps y Power Automate de Power Platform, perteneciente a Microsoft.
        Trabajo en un equipo interdisciplinario con la metodología Scrum, teniendo reuniones diarias y sprints cada dos o tres semanas.`,
        posicionY: "exp-bar-Y--0"
            
    },
    {
        id: 2,
        puesto: "Vendedor",
        empresa: "Distribuidora Argüello",
        urlEmpresa: "https://www.google.com.ar",
        fechaInicio: "Marzo 2018",
        fechaFin: "Febrero 2019",
        descripcion: "Trabajé como vendedor de los diferentes artículos que se ofrecían en el negocio.",
        posicionY: "exp-bar-Y--45"
             
    },
    {
        id: 3,
        puesto: "Secretario",
        empresa: "ByV Asociados",
        urlEmpresa: "https://www.google.com.ar",
        fechaInicio: "Septiembre 2017",
        fechaFin: "Diciembre 2017",
        descripcion: "Llevaba a cabo la tarea de llamar a clientes morosos para hacer un plan de financiación de sus deudas.",
        posicionY: "exp-bar-Y--90"     
             
    }
]