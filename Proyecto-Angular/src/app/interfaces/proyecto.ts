export interface Proyecto {
    
    id?: number,
    nombre:string,
    imagen: string,
    descripcion: string,
    url_github: string,
    url_sitio_web?: string,
    tecnologias: any,
    persona: object,
    titulo_seccion: object 
}
