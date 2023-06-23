import React, { Fragment } from 'react';
import { FormErrorMessage, FormLabel, InputGroup, InputRightElement } from '@chakra-ui/react';
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete';
import citiesJSON from '../../data/cities.json';

interface SearchableDropDownProps {
    formObject: any;
    fieldName: string;
    formLabel: string | null;
    hasRightIcon: boolean;
    rightIcon?: any;
    iconClickHandler?: Function;
    inputIdentifier?: number | string;
}

const SearchableDropDownComponent: React.FC<SearchableDropDownProps> = props => {
    const { formObject, fieldName, formLabel, hasRightIcon, rightIcon, iconClickHandler, inputIdentifier } = props;

    return (
        <Fragment>
            <FormLabel htmlFor={fieldName}>{formLabel}</FormLabel>
            <AutoComplete
                openOnFocus
                restoreOnBlurIfEmpty={false}
                onSelectOption={data => {
                    formObject.setFieldValue(fieldName, data.item.value);
                }}>
                <InputGroup>
                    <AutoCompleteInput
                        name={fieldName}
                        isInvalid={formObject.errors[`${fieldName}`] !== undefined}
                        onBlurCapture={e => formObject.setFieldValue(fieldName, e.target.value)}
                        onFocusCapture={e => formObject.setFieldValue(fieldName, e.target.value)}
                        onChange={e => formObject.setFieldValue(fieldName, e.target.value)}
                        placeholder='Search for a city...'
                    />
                    {hasRightIcon && (
                        <InputRightElement
                            cursor={'pointer'}
                            onClick={e => typeof iconClickHandler === 'function' && iconClickHandler(e)}
                            children={rightIcon}
                            {...{ 'intermediate-city-id': `${inputIdentifier}` }}
                        />
                    )}
                </InputGroup>
                <AutoCompleteList>
                    {citiesJSON.map(city => (
                        <AutoCompleteItem key={`option-${city[0]}`} value={`${city[0]}`} textTransform='capitalize'>
                            {city[0]}
                        </AutoCompleteItem>
                    ))}
                </AutoCompleteList>
            </AutoComplete>
            <FormErrorMessage>{formObject.errors[`${fieldName}`]}</FormErrorMessage>
        </Fragment>
    );
};

export default SearchableDropDownComponent;
