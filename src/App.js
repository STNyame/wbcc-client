import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-div"></div>
        <Switch>
          <Route path="/:cur?" component={LandingPage} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
