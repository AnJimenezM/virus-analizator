

export const Home = () => {
    
   //Funcion para cuando de click en analizar aparesca una alerta
 const HandleClick = () =>{
    alert("debes iniciar sesion")
    
 }
     
        
    return (
        
        <div className='content'>
            <h1 className='title'>Virus-Analizator</h1>
            <span className='icon-file'><i className='bx bx-file'></i></span>
            <div>
                <div className='file'>
                    <form className=''>
                        <input type="file" name="file" />
                        <button id='analizar' className='btn btn-primary' type="submit" onClick={HandleClick}>Analizar</button>
                    </form>
                   
                    
                </div>
            </div>
        </div>
    );
};
