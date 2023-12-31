import { FormControl } from '@chakra-ui/form-control';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, ReactNode, useEffect } from 'react';
import ts from 'typescript';
import * as Yup from 'yup';
import SearchableDropDownComponent from './SearchableDropDown';

interface IntermediateCitiesProps {
    addInputButtonRef?: any;
    inputs: ts.ESMap<string, object> | any;
    setInputs: Function;
    formObject: any;
    formValidationObject: any;
    setInputsValidation: Function;
    formValues: any;
    setFormValues: Function;
}

const IntermediateCitiesComponent: React.FC<IntermediateCitiesProps> = props => {
    const { inputs, setInputs, formObject, addInputButtonRef, setInputsValidation, formValidationObject, formValues, setFormValues } =
        props;

    /**
     * Manage state loigc of parent component keeping track of
     * form values and validators plus the react component
     * of the input itself
     *
     * @param mapKey
     */
    const createInput = (mapKey: string): void => {
        //Setting up validations
        setInputsValidation((prevState: any) => ({ ...prevState, [mapKey]: Yup.string().required('Required!') }));
        //Add values to form
        setFormValues((prevState: any) => ({ ...prevState, [mapKey]: '' }));
    };

    /**
     * Creating a new input and inserting
     * data into appropriate state objects
     */
    const addIntermediateCityInput = (): void => {
        let uniqueId: string = Math.floor(Math.random() * Date.now()).toString(16);
        let mapKey: string = `intermediate-city-id-${uniqueId}`;
        createInput(mapKey);
        let { errors } = formObject;

        let newInput: Object = (
            <FormControl isInvalid={errors[mapKey] !== undefined} key={mapKey}>
                <SearchableDropDownComponent
                    formObject={formObject}
                    formLabel={'Intermediate city'}
                    fieldName={mapKey}
                    hasRightIcon={true}
                    rightIcon={<FontAwesomeIcon icon={faSquareMinus} />}
                    inputIdentifier={uniqueId}
                    iconClickHandler={removeIntermediateCityInput}
                    isInvalid={errors[mapKey] !== undefined}
                    errorMessage={errors[mapKey]}
                />
            </FormControl>
        );

        // Adding the new input in the parent state map object
        setInputs((oldValues: any) => {
            return new Map(oldValues.set(mapKey, newInput));
        });
    };

    /**
     * Opposite of the createInput cleans up the parent state
     * of all refrencaes to the created intermediate inpu
     *
     * @param e
     */
    const removeIntermediateCityInput = (e: React.MouseEvent): void => {
        const inputIdentifier =
            'intermediate-city-id-' + ((e.currentTarget as HTMLInputElement).getAttribute('intermediate-city-id') as string);
        setInputs((oldValues: any) => {
            const updated = new Map(oldValues);
            updated.delete(inputIdentifier);
            return new Map(updated);
        });
        //Delete validations
        const updatedValidations = { ...formValidationObject };
        delete updatedValidations[inputIdentifier];
        setInputsValidation(updatedValidations);
        //Delete values of form
        const updatedFormValues = { ...formValues };
        delete updatedFormValues[inputIdentifier];
        setFormValues(updatedFormValues);
    };

    useEffect(() => {
        const buttonRef = addInputButtonRef.current;
        buttonRef.addEventListener('click', addIntermediateCityInput);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => {
            buttonRef.removeEventListener('click', addIntermediateCityInput);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderItermediateCitiesInputs = () => {
        let toRenderInputs: ReactNode[] = [];
        inputs.forEach((inputComponent: any) => {
            return toRenderInputs.push(inputComponent as ReactNode);
        });
        return toRenderInputs;
    };

    return <Fragment>{renderItermediateCitiesInputs()}</Fragment>;
};

export default IntermediateCitiesComponent;
