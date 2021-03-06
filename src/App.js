import React, { Component } from "react";
import uuidv1 from "uuid/v1";
import { Div, H1 } from "glamorous";

import sendReq from "./sendReq";

import Textarea from "./Textarea";
import Button from "./Button";
import CenterContainer from "./CenterContainer";
import Result from "./Result";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      svgStr: "",
      loading: false,
      urlStr: "",
      err: null
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick() {
    this.setState({ svgStr: "" });
    this.textarea.focus();
  }

  onChange(e) {
    const { value } = e.target;
    this.setState({ svgStr: value });
    if (value.trim()) {
      this.sendRequest(value);
    }
  }

  sendRequest(data) {
    const uuid = uuidv1();
    this.uuid = uuid;
    this.setState({ loading: true, urlStr: "", err: null });
    sendReq(data)
      .then(urlStr => {
        if (uuid !== this.uuid) return;
        this.setState({ loading: false, urlStr });
      })
      .catch(err => {
        if (uuid !== this.uuid) return;
        this.setState({ loading: false, err });
      });
  }

  render() {
    const { svgStr, loading, urlStr, err } = this.state;

    return (
      <Div
        position="fixed"
        width="100%"
        height="100%"
        padding="20px"
        display="flex"
        flexDirection="column"
      >
        <Div flex="0" marginBottom="10px">
          <H1>
            <strong fontWeight="bold">svg to url app</strong>: convert svg
            string to data url
          </H1>
        </Div>
        <Div flex="1" display="flex">
          <Div flex="1" marginRight="5px" position="relative">
            <Button onClick={this.onClick}>clear</Button>
            <Textarea
              innerRef={c => {
                this.textarea = c;
              }}
              resize="none"
              placeholder="Paste svg code here"
              value={svgStr}
              onChange={this.onChange}
            />
          </Div>
          <Div flex="1" marginLeft="5px" position="relative">
            {loading && <CenterContainer>fetching result...</CenterContainer>}
            {!loading &&
              err &&
              <CenterContainer>
                <Div color="red">
                  {err.message}
                </Div>
              </CenterContainer>}
            {!loading && svgStr && urlStr && <Result url={urlStr} />}
          </Div>
        </Div>
      </Div>
    );
  }
}

export default App;
