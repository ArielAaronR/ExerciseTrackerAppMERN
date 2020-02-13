import React, { Component } from "react";
import axios from "axios";

export default class GetUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneUser: {}
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: res.data.date.substring(0, 10)
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="card w-75">
        <div className="card-header">{this.state.username}</div>
        <div className="card-body">
          <p>{this.state.description}</p>
          <p>{this.state.duration}</p>
          <p>{this.state.date}</p>
        </div>
      </div>
    );
  }
}
