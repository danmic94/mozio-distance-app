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

    useEffect(() => {
        const buttonRef = addInputButtonRef;
        buttonRef.current.addEventListener('click', addIntermediateCityInput);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => {
            buttonRef.current.removeEventListener('click', addIntermediateCityInput);
        };
    }, []);

    useEffect(() => {
        console.log(formObject.values, formObject.errors);
    }, [formObject.values]);

    const addIntermediateCityInput = (): void => {
        let uniqueId: string = Math.floor(Math.random() * Date.now()).toString(16);
        let mapKey: string = `intermediate-city-id-${uniqueId}`;

        //Setting up validations
        const updatedValidations = { ...formValidationObject };
        updatedValidations[mapKey] = Yup.string().required('Required');
        setInputsValidation(updatedValidations);

        //Add values to form
        const updatedFormValues = { ...formValues };
        updatedFormValues[mapKey] = '';
        setFormValues(updatedFormValues);
        formObject.validateForm();

        let newInput: Object = (
            <FormControl key={mapKey} isInvalid={formObject.errors[mapKey] !== undefined}>
                <SearchableDropDownComponent
                    formObject={formObject}
                    formLabel={'Intermediate city'}
                    fieldName={mapKey}
                    hasRightIcon={true}
                    rightIcon={<FontAwesomeIcon icon={faSquareMinus} />}
                    inputIdentifier={uniqueId}
                    iconClickHandler={removeIntermediateCityInput}
                    isInvalid={formObject.errors[mapKey] !== undefined}
                    errorMessage={formObject.errors[mapKey]}
                />
            </FormControl>
        );
        setInputs((oldValues: any) => {
            return new Map(oldValues.set(mapKey, newInput));
        });
    };

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
