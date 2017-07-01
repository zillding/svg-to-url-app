import React from "react";
import { Div } from "glamorous";

function Loader() {
  return (
    <Div
      position="absolute"
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      fetching result...
    </Div>
  );
}

export default Loader;
