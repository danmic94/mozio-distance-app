import { FormControl } from '@chakra-ui/form-control';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, ReactNode, useEffect } from 'react';
import ts from 'typescript';
import SearchableDropDownComponent from './SearchableDropDown';

interface IntermediateCitiesProps {
    addInputButtonRef?: any;
    inputs: ts.ESMap<string, object> | any;
    setInputs: Function;
    formObject: any;
}

const IntermediateCitiesComponent: React.FC<IntermediateCitiesProps> = props => {
    const { inputs, setInputs, formObject, addInputButtonRef } = props;

    useEffect(() => {
        const buttonRef = addInputButtonRef;
        buttonRef.current.addEventListener('click', addIntermediateCityInput);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => {
            buttonRef.current.removeEventListener('click', addIntermediateCityInput);
        };
    }, []);

    const addIntermediateCityInput = (): void => {
        let uniqueId: string = Math.floor(Math.random() * Date.now()).toString(16);
        let mapKey: string = `intermediate-city-id-${uniqueId}`;
        let newInput: Object = (
            <FormControl key={mapKey}>
                <SearchableDropDownComponent
                    formObject={formObject}
                    formLabel={'Intermediate city'}
                    fieldName={`intermediate-city-${uniqueId}`}
                    hasRightIcon={true}
                    rightIcon={<FontAwesomeIcon icon={faSquareMinus} />}
                    inputIdentifier={uniqueId}
                    iconClickHandler={removeIntermediateCityInput}
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
