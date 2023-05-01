export interface Formacion {
    
    id?: number,
    nombre:string,
    institucion: string,
    fecha_inicio: string,
    fecha_fin: string,
    descripcion: string,
    url_certificado?: string,
    url_institucion: string,
    imagen: string,
    persona: object,
    titulo_seccion: object 

}
