import { PropsWithChildren, useState } from 'react';
import FormContext from './FormContext';

const FormContextProvider: React.FC<PropsWithChildren> = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [intermediateCitiesInputs, setintermediateCitiesInputs] = useState<Map<string, Object>>(new Map());

    return (
        <FormContext.Provider
            value={{
                isLoading: isLoading,
                setLoader: setIsLoading,
                showError: showError,
                setErrorAlertFlag: setShowError,
                intermediateCitiesInputs: intermediateCitiesInputs,
                setintermediateCitiesInputs: setintermediateCitiesInputs,
            }}>
            {props.children}
        </FormContext.Provider>
    );
};

export default FormContextProvider;
