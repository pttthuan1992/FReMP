import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';

function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={ Home }/>
            <Route exact path="/signin" component={ Login } />
            <Route exact path="/register" component={ Register } />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
