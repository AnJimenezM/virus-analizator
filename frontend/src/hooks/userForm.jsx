import  { useState } from 'react'


export const userForm = (initialObj = {}) => {

    const [form, setForm] = useState(initialObj);

    const changed = ({target}) => {
        const {name, value} = target;
    
        setForm({
          ...form,
          [name]: value
        });

    }   
    
     // Método para resetear el formulario a su estado inicial
  const resetForm = () => {
    setForm(initialObj);
  };
  return {
    form,
    changed,
    resetForm
}
}
