import { PropsWithChildren, useState } from 'react';
import FormContext from './FormContext';

const FormContextProvider: React.FC<PropsWithChildren> = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    return (
        <FormContext.Provider
            value={{
                isLoading: isLoading,
                setLoader: setIsLoading,
                showError: showError,
                setErrorAlertFlag: setShowError,
            }}>
            {props.children}
        </FormContext.Provider>
    );
};

export default FormContextProvider;
