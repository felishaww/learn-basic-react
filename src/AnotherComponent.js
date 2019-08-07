import React from "react";
import { Button } from "antd";
// const axios = require("axios");
//import axios from 'axios';
import MaskedInput from 'react-text-mask'



class AnotherComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      multiply: 1
    };

  }

  handleAddNumber = () => {
    this.setState({ number: this.state.number + 1 }, () => {
      this.props.handleUpdateNumber(this.state.number)
    });

  };

  handleSubtractNumber = () => {
    this.setState({ number: this.state.number - 1 }, () => {
      this.props.handleUpdateNumber(this.state.number)
    });
  };

  handleMultiplyNumber = () => {
    this.setState({ number: this.state.number * this.state.multiply }, () => {
      this.props.handleUpdateNumber(this.state.number)
    });
  };

  onChange = (e) => {
    this.setState({ multiply: e.target.value });
  }

  render() {
    console.log("props another component", this.props);
    return (
      <div>
        <Button onClick={this.handleAddNumber} className="coba" type="danger">
          Tambah
        </Button>
        <Button
          onClick={this.handleSubtractNumber}
          className="coba"
          type="danger"
        >
          Kurang
        </Button>

        {/* <form>

          <input
            class="input"
            id='name'
            placeHolder="input multiplier"
            type="number" value={this.state.multiply}
            onChange={this.onChange}
          />

          <Button
            onClick={this.handleMultiplyNumber}
            className="coba"
            type="primary"
          >
            multiply
        </Button>
        </form> */}


        <div>
          <MaskedInput
            mask={s => Array.from(s).map(() => /[0-9]/i)}
            guide={false}
            class="input"
            id='name'
            placeHolder="input multiplier"
            type="number"
            value={this.state.multiply}
            onChange={this.onChange}
          />
          <Button
            onClick={this.handleMultiplyNumber}
            className="coba"
            type="primary"
          >
            multiply
        </Button>
        </div>


      </div>
    );
  }
}

export default AnotherComponent;
