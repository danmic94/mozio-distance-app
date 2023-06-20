### Mozio distance interview project :car: :taxi: :bus:
Interview task that involves the haversine formulan and a React App

## Requirements 

- [ ] Home page component :house:
    - [ ] A form with an origin and destination searchable dropdowns;
    - [ ] Ability to add itermediaate cities in between origin and destination;
    - [ ] Origin and destination cities are required to be filled in;
    - [ ] Home page should initiate with no in-between cities;
    - [ ] Once in between cities are added they are required to be filled;
    - [ ] The search of cities should be ASYNC and there should be a UI loading spinner;
    - [ ] There should be a date of the trip form field __with date to be in future validation and required__;
    - [ ] Passagers field with __number validation and required__ (number input wiht mask maybe?)
    - [ ] Form should display for each field the propper error message and highlight the in error field;
    - [ ] If the form is invalid diasble the submit button;
    - [ ] Submit should redirect to the search result page (react-router involvement);
    - [ ] The URL from the Home page should carry on the form data as query string so it can have sharebale links;
- [ ] Search page component :mag:
    - [ ] Render the same form fields as in the Home page component
    - [ ] Calculating the involvement the distance of the route (in kilometers using Haversine fake API call) should be calculated and displayed;
    - [ ] Display distance between subsequent cities if added and also show total distance;
    - [ ] Distance calculation should be handled as an ASYNC API call with __UI loader informing the user of the server processing__ :hourglass_flowing_sand:;
    - [ ] Should take in the query string from home route and be reusable and shareable;

## Technical Requirements
 - [ ] Use React with TypeScript
 - [ ] Two Mock endpoints simulating ASYNC functionality for the cities search and Haversine formula;
 - [ ] The first endpoint receives a keyword and returns a list of cities that match the keyword;
 - [ ] The second endpoint receives a list of cities and calculates the distances.
 - [ ] :bangbang: Searching for the phrase “fail” (case-insensitive) the mocked API should fail to return results to demonstrate the error handling abilities of the UI
 - [ ] :interrobang: __Searching for Dijon should throw an error to dispaly UI handling of such cases__;
 - [ ] Deploy to some free service for public availability;



## Nice to have or extras 
- [ ] Unit tests
- [ ] E2E partial testing
