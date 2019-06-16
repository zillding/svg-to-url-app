import React, { Component } from "react";
import { Div, Img } from "glamorous";

import Textarea from "./Textarea";
import Button from "./Button";

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };

    this.onFocusTextarea = this.onFocusTextarea.bind(this);
    this.onClickCopy = this.onClickCopy.bind(this);
  }

  onFocusTextarea() {
    this.textarea.select();
  }

  onClickCopy() {
    this.textarea.select();
    document.execCommand("copy");
  }

  render() {
    const { url } = this.props;

    return (
      <Div
        position="absolute"
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Div flex="1" marginBottom="5px" position="relative">
          <Textarea
            innerRef={c => {
              this.textarea = c;
            }}
            readOnly
            value={url}
            onFocus={this.onFocusTextarea}
          />
          <Button onClick={this.onClickCopy}>copy</Button>
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
        <Div
          backgroundColor="#eee"
          padding="10px"
          marginTop="5px"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          <code>{`<img src="${url}" />`}</code>
        </Div>
      </Div>
    );
  }
}

export default Result;
