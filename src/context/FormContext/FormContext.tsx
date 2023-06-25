import { createContext } from 'react';

export interface FormContextState {
    isLoading: boolean;
    setLoader: Function;
    showError: boolean;
    setErrorAlertFlag: Function;
}

const FormContext = createContext<FormContextState>({
    isLoading: false,
    setLoader: () => {},
    showError: false,
    setErrorAlertFlag: () => {},
});

export default FormContext;
