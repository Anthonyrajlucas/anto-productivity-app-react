import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import "./api/axiosDefaults";
import TaskList from "./pages/tasks/TaskList";
import TaskCreateForm from "./pages/tasks/TaskCreateForm";
import HomePage from "./pages/home/HomePage";
import AllTasks from "./pages/tasks/AllTasks"
import Profile from "./components/Profile"; 

function App() {
  return (
    <div className={styles.App}>
    <NavBar />
    <Container className={styles.Main}>
      <Switch>
        <Route exact path="/" render={() => <HomePage /> } />
        <Route exact path="/signin" render={() => <SignInForm />} />
        <Route exact path="/signup" render={() => <SignUpForm />} />
        <Route exact path="/tasklist" render={() => <TaskList/>} />
        <Route exact path="/tasksCreate" render={() => <TaskCreateForm/>} />
        <Route exact path="/alltasks" render={() => <AllTasks/>} />
        <Route exact path="/profile" render={() => <Profile/>} />
        <Route render={() => <p>Page not found!</p>} />
        <Route render={() => <p>Page not found!</p>} />
      </Switch>
    </Container>
  </div>
  );
}

export default App;