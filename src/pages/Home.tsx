import React, { Fragment } from "react";
import SearchForm from "./components/SearchForm";

interface HomePageProps {}

const HomePageComponent: React.FC<HomePageProps> = () => {
  return (
    <Fragment>
      <span>This is the home page</span>
      <br/>
      <SearchForm />
    </Fragment>
  );
};

export default HomePageComponent;
