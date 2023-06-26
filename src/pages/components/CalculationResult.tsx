import { Heading, List, ListItem, Text } from '@chakra-ui/react';
import { IconDefinition, faCar, faEllipsisVertical, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, ReactNode } from 'react';

interface CalculationResultProps {
    results: Array<[string, string, number]>;
    totalDistance: number;
}

const CalculationResultComponent: React.FC<CalculationResultProps> = props => {
    const { results, totalDistance } = props;
    const fetchListIcon = (index: number, listLength: number): IconDefinition => {
        let icon: IconDefinition = faCar;
        switch (index) {
            case 0:
                icon = faCar;
                break;
            case listLength - 1:
                icon = faFlagCheckered;
                break;
            default:
                icon = faEllipsisVertical;
                break;
        }
        return icon;
    };

    const renderResults = () => {
        let toRenderInputs: ReactNode[] = [];
        const cities = results;
        let i = 0,
            currentCity;

        if (cities.length === 1) {
            let ico: IconDefinition = fetchListIcon(i, cities.length);
            toRenderInputs.push(
                <ListItem textAlign={'left'} key={i}>
                    <FontAwesomeIcon icon={ico} />
                    <Text paddingLeft={'1rem'} display={'inline-block'}>
                        From {cities[0][0]} - {cities[0][1]} you'll travel {cities[0][2]}
                    </Text>
                </ListItem>,
            );
            return toRenderInputs;
        }

        do {
            currentCity = cities[i];
            let ico: IconDefinition = fetchListIcon(i, cities.length);
            toRenderInputs.push(
                <ListItem textAlign={'left'} key={i}>
                    <FontAwesomeIcon icon={ico} />
                    <Text paddingLeft={'1rem'} display={'inline-block'}>
                        From {currentCity[0]} - {currentCity[1]} you'll travel {currentCity[2]}
                    </Text>
                </ListItem>,
            );
            i++;
        } while (cities[i]);
        return toRenderInputs;
    };
    return (
        <Fragment>
            <Heading marginBottom={'1rem'} textAlign={'left'}>
                Total distance:{totalDistance} KM
            </Heading>
            <List spacing={3}>{renderResults()}</List>
        </Fragment>
    );
};

export default CalculationResultComponent;
