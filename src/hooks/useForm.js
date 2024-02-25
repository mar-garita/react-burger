import { useState } from 'react';

const useForm = inputValues => {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };

    const reset = () => {
        setValues(inputValues);
    }

    return {values, handleChange, reset};
}

export default useForm;
