
export const SerializeForm = (form) => {
    const formData = new FormData(form);

    // Objeto vacío
    const completeObj = {};
  
    for (let [name, value] of formData){
      completeObj[name] = value;
    }
  return completeObj;
    
  
}
