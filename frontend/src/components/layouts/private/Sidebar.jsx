import React from 'react'
import { useState } from 'react';

export const Sidebar = () => {
    const [error, setError] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
  
    const handleAnalyze = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const file = formData.get('file');
        const fileSize = file.size;
        setIsAnalyzing(true);
        setError(null);
        setProgress(0);
  
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `http://localhost:3000/upload?timestamp=${new Date().getTime()}`, true);
  
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                simulateSlowProgress(percentComplete, fileSize)
            }
        };
  
        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                setProgress(100); // Asegurarse de que el progreso esté al 100%
                setTimeout(()=>
                  openResultsInNewTab(data.data),
                  500);
  
                  
                
            } else {
                setError('Network response was not ok');
            }
            setIsAnalyzing(false);
        };
  
        xhr.onerror = () => {
            setError('Error de red');
            setIsAnalyzing(false);
        };
  
        xhr.send(formData);
    };
  
    const simulateSlowProgress = (targetProgress, fileSize) =>{
      let currentProgress = progress;
      const intervalTime = Math.max(100, fileSize / 100);
      const interval = setInterval(()=>{
        if(currentProgress <targetProgress){
          currentProgress += 1;
  
          setProgress(currentProgress);
          
        } else{
          clearInterval(interval);
        }
      }, intervalTime)
      
    };
  
    const openResultsInNewTab = (data) => {
        const newWindow = window.open('', '_blank');
        if (newWindow) {
            newWindow.document.write('<html><head><title>Resultados del Análisis</title></head><body>');
            newWindow.document.write('<pre>' + JSON.stringify(data, null, 2) + '</pre>');
            newWindow.document.write('</body></html>');
            newWindow.document.close();
        } else {
            setError("No se pudo abrir una nueva pestaña");
        }
    };
  
  return (
    
    <div className='content'>
        
            <h1 className='title'>Virus-Analizator</h1>
            <span className='icon-file'><i className='bx bx-file'></i></span>
            <div>
                <div className='file'>
                    <form className='' onSubmit={handleAnalyze}>
                        <input type="file" name="file" />
                        <button id='analizar' className='btn btn-primary' type="submit">{isAnalyzing ? 'Analizando....' : 'Analizar'}</button>
                    </form>
                    {isAnalyzing && <p>Progreso: {progress.toFixed(2)}%</p>}
                    {error && <p>Error: {error}</p>}
                </div>
            </div>
        </div>
  )
}
