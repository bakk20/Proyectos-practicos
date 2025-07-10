import {useState} from 'react'

export const ImgPreview = () => {
    const[image, setImage] = useState(null)
    const[preview, setPreview] = useState(null)

    const handleFileChange= (e) =>{
        const file = e.target.files[0]
        if(file){
            if(preview){
                URL.revokeObjectURL(preview)
            }
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }

  return (
    <>
    <div>
        <h1>Aqui previsualizas imagenes</h1>
        </div>
    <div>Ingresa una imagen aqui:</div>
    <div>
        <input type='file' accept='image/*' onChange={handleFileChange}></input>
    </div>

    <div> 
        <h2>Aqui la imagaen renderizada</h2>
        <div>
            {preview && <img src={preview} placeholder='Image Placeholder' style={{ maxWidth:200}}></img> }
        </div>
    </div>
    </>
  )
}
