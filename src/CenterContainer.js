import React from "react";
import { Div } from "glamorous";

function CenterContainer({ children }) {
  return (
    <Div
      position="absolute"
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Div>
  );
}

export default CenterContainer;
