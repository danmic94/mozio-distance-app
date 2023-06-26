### Mozio distance interview project :car: :taxi: :bus:

Interview task that involves the haversine formulan and a React App

## Requirements

-   [ ] Home page component :house:
    -   [x] A form with an origin and destination searchable dropdowns;
    -   [x] Ability to add itermediaate cities in between origin and destination;
    -   [x] Origin and destination cities are required to be filled in;
    -   [x] Home page should initiate with no in-between cities;
    -   [ ] Once in between cities are added they are required to be filled;
    -   [x] The search of cities should be ASYNC and there should be a UI loading spinner;
    -   [x] There should be a date of the trip form field **with date to be in future validation and required**;
    -   [x] Passagers field with **number validation and required** (number input wiht mask maybe?)
    -   [x] Form should display for each field the propper error message and highlight the in error field;
    -   [x] If the form is invalid diasble the submit button;
    -   [x] Submit should redirect to the search result page (react-router involvement);
    -   [ ] The URL from the Home page should carry on the form data as query string so it can have sharebale links;
-   [ ] Search page component :mag:
    -   [x] Render the same form fields as in the Home page component
    -   [x] Calculating the involvement the distance of the route (in kilometers using Haversine fake API call) should be calculated and displayed;
    -   [x] Display distance between subsequent cities if added and also show total distance;
    -   [x] Distance calculation should be handled as an ASYNC API call with **UI loader informing the user of the server processing** :hourglass_flowing_sand:;
    -   [x] Should take in the query string from home route and be reusable and shareable; (should be nice to add link with copy to clipboard)

## Technical Requirements

-   [x] Use React with TypeScript
-   [x] Two Mock endpoints simulating ASYNC functionality for the cities search and Haversine formula;
-   [x] The first endpoint receives a keyword and returns a list of cities that match the keyword;
-   [x] The second endpoint receives a list of cities and calculates the distances.
-   [x] :bangbang: Searching for the phrase “fail” (case-insensitive) the mocked API should fail to return results to demonstrate the error handling abilities of the UI
-   [x] :interrobang: **Searching for Dijon should throw an error to dispaly UI handling of such cases**;
-   [x] Deploy to some free service for public availability;

## Nice to have or extras

-   [x] Unit tests
-   [ ] E2E partial testing

You can use this query string to test is the distance is calculated [^boh] blah.

[^boh]: ?startCity=Strasbourg&finalDestination=Saint-Étienne&passangers=2&departureDate=Mon+Jun+26+2023+13%3A17%3A42+GMT%2B0300+%28Eastern+European+Summer+Time%29&citiesData=Strasbourg%2C48.573405%2C7.752111%2CSaint-Étienne%2C45.439695%2C4.387178.
