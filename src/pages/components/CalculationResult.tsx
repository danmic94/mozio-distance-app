import { List, ListItem } from '@chakra-ui/react';
import { faArrowDown, faCar, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, ReactNode } from 'react';

interface CalculationResultProps {
    results: Array<[string, string, number]>;
}

const CalculationResultComponent: React.FC<CalculationResultProps> = props => {
    const { results } = props;
    console.log(results);

    const renderResults = () => {
        let toRenderInputs: ReactNode[] = [];
        const cities = results;
        let i = 0,
            currentCity;

        if (cities.length === 2) {
            toRenderInputs.push(
                <ListItem key={cities[0][0]}>
                    <FontAwesomeIcon icon={faCar} />
                    From {cities[0][0]} - {cities[0][1]} you'll travel {cities[0][2]}
                </ListItem>,
            );
            toRenderInputs.push(
                <ListItem key={cities[1][0]}>
                    <FontAwesomeIcon icon={faFlagCheckered} />
                    From {cities[1][0]} - {cities[1][1]} you'll travel {cities[1][2]}
                </ListItem>,
            );

            return toRenderInputs;
        }

        if (cities.length > 2) {
            do {
                currentCity = cities[i];
                toRenderInputs.push(
                    <ListItem key={i}>
                        {i === 0 ?? <FontAwesomeIcon icon={faCar} />}
                        {i < cities.length ?? <FontAwesomeIcon icon={faArrowDown} />}
                        {i === cities.length - 1 ?? <FontAwesomeIcon icon={faFlagCheckered} />}
                        <FontAwesomeIcon icon={i === 0 ? faCar : faArrowDown} />
                        From {currentCity[0]} - {currentCity[1]} you'll travel {currentCity[2]}
                    </ListItem>,
                );
                i++;
            } while (cities[i]);
        }

        return toRenderInputs;
    };
    return (
        <Fragment>
            <List spacing={3}>{renderResults()}</List>
        </Fragment>
    );
};

export default CalculationResultComponent;
