export const AxiosErrorHandler = (error: unknown, context: string) =>{
    if(error instanceof Error){
        console.error(`Error en axios: ${context}`, error.message)
    }else{
        console.error('Error desconocido', error)
    }
}