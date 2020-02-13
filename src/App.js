import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercises.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-users.component";
import GetUser from "./components/get-user.component";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <br />
        <Route path="/" exact component={ExerciseList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user/create" component={CreateUser} />
        <Route path="/one/:id" component={GetUser} />
      </div>
    </Router>
  );
}

export default App;
