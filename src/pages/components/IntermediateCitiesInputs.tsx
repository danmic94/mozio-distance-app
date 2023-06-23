import React, { Fragment, ReactNode } from "react";
import ts from "typescript";

interface IntermediateCitiesProps {
  inputs: ts.ESMap<string,object>
}

const IntermediateCitiesComponent: React.FC<IntermediateCitiesProps> = (props) => {
  const {inputs} = props;

  const renderItermediateCitiesInputs = () => {
    let toRenderInputs: ReactNode[] = [];
    inputs.forEach((inputComponent) => {
      return toRenderInputs.push(inputComponent as ReactNode);
    })
    return toRenderInputs;
  }

  return (
    <Fragment>
      {renderItermediateCitiesInputs()}
    </Fragment>
  );
};

export default IntermediateCitiesComponent;
