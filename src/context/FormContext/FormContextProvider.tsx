import { PropsWithChildren, useState } from 'react';
import FormContext from './FormContext';
import * as Yup from 'yup';

const FormContextProvider: React.FC<PropsWithChildren> = props => {
    const today = new Date();
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [intermediateCitiesInputs, setintermediateCitiesInputs] = useState<Map<string, Object>>(new Map());
    const [formValues, setformValues] = useState({
        startCity: '',
        finalDestination: '',
        passangers: 1,
        departureDate: today,
    });
    const [formValidators, setformValidators] = useState({
        startCity: Yup.string().required('Required'),
        finalDestination: Yup.string().required('Required'),
        passangers: Yup.number().integer().min(1, 'Must have at least one passanger!').required('Required'),
        departureDate: Yup.date().min(today, 'Date is in the past!').required('Required!'),
    });

    return (
        <FormContext.Provider
            value={{
                isLoading: isLoading,
                setLoader: setIsLoading,
                showError: showError,
                setErrorAlertFlag: setShowError,
                intermediateCitiesInputs: intermediateCitiesInputs,
                setintermediateCitiesInputs: setintermediateCitiesInputs,
                formValues: formValues,
                setFormValues: setformValues,
                formValidations: formValidators,
                setFormValidations: setformValidators,
            }}>
            {props.children}
        </FormContext.Provider>
    );
};

export default FormContextProvider;
