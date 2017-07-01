import React from "react";
import glamorous, { Div, Img } from "glamorous";

const Textarea = glamorous.textarea("c-txt__input", {
  resize: "none",
  height: "100%"
});

function Result({ url }) {
  return (
    <Div
      position="absolute"
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Div flex="1" marginBottom="5px">
        <Textarea value={url} readOnly />
      </Div>
      <Div
        flex="1"
        marginTop="5px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Img maxWidth="100%" maxHeight="100%" alt="preview" src={url} />
      </Div>
    </Div>
  );
}

export default Result;
