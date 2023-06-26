import { createContext } from 'react';

export interface FormContextState {
    isLoading: boolean;
    setLoader: Function;
    showError: boolean;
    setErrorAlertFlag: Function;
    intermediateCitiesInputs: Map<string, Object>;
    setintermediateCitiesInputs: Function;
    formValues: Object;
    setFormValues: Function;
    formValidations: Object;
    setFormValidations: Function;
}

const FormContext = createContext<FormContextState>({
    isLoading: false,
    setLoader: () => {},
    showError: false,
    setErrorAlertFlag: () => {},
    intermediateCitiesInputs: new Map(),
    setintermediateCitiesInputs: () => {},
    formValues: {},
    setFormValues: () => {},
    formValidations: {},
    setFormValidations: () => {},
});

export default FormContext;
