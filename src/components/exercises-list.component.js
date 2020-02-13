import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
/**
 * This <Exercise> is a functional react component
 * this has a lack of state or didMount method
 */
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link className="btn btn-success" to={"/one/" + props.exercise._id}>
        View
      </Link>
      |
      <Link className="btn btn-primary" to={"/edit/" + props.exercise._id}>
        edit
      </Link>
      |
      <button
        className="btn btn-danger"
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </button>
    </td>
  </tr>
);
/**
 * The ExerciseList component
 * is implemented as a class component
 */
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    //initializes the state of the component
    this.state = {
      exercises: []
    };
  }
  //get the list of exercises from the db
  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then(res => {
        this.setState({ exercises: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then(res => console.log(res.data));
    /**
     * After deleting from the database
     * need to set the state and removing that element
     * use filter method to realtime reload the page
     * with the existing elements
     */
    this.setState({
      exercises: this.state.exercises.filter(element => element._id !== id)
    });
  }

  exerciseList() {
    /**
     * .map() will return something for
     * every element in the array
     * for every element it will return an
     * <Exercise/> component
     */
    return this.state.exercises.map(currentexercise => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  oneExercise() {}

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
