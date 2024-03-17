import { ChangeEvent, useState } from 'react';

interface IUseFormValues {
    [key: string]: string;
}

interface IUseFormReturn {
    values: IUseFormValues;
    handleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
}

const useForm = (inputValues: IUseFormValues): IUseFormReturn => {
    const [values, setValues] = useState<IUseFormValues>(inputValues);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = evt.target;
        setValues({...values, [name]: value});
    };

    const reset = () => {
        setValues(inputValues);
    }

    return {values, handleChange, reset};
}

export default useForm;
