import React from "react";
import glamorous, { Div, Img } from "glamorous";

const Textarea = glamorous.textarea("c-txt__input", {
  resize: "none",
  position: "absolute",
  width: "100%",
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
      <Div flex="1" marginBottom="5px" position="relative">
        <Textarea value={url} readOnly />
      </Div>
      <Div
        flex="1"
        marginTop="5px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Div position="absolute" width="100%" height="100%" left="0" top="0">
          <Img width="100%" height="100%" alt="preview" src={url} />
        </Div>
      </Div>
    </Div>
  );
}

export default Result;
