import React, { Fragment } from "react";
import SearchForm from "./components/SearchForm";

interface HomePageProps {}

const HomePageComponent: React.FC<HomePageProps> = () => {
  return (
    <Fragment>
      <SearchForm />
    </Fragment>
  );
};

export default HomePageComponent;
