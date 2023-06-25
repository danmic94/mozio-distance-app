import { createContext } from 'react';

export interface FormContextState {
    isLoading: boolean;
    setLoader: Function;
}

const FormContext = createContext<FormContextState>({ isLoading: false, setLoader: () => {} });

export default FormContext;
