import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProvideAuth } from "./Auth";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Room from "./pages/Room";
import _Home from "./pages/_Home";
import _Room from "./pages/_Room";

const App = () => (
  <div className="App">
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/" component={_Home} />
          <Route exact path="/register" component={Register} />
          <Route path="/room/:roomId" component={Room} />
          <Route path="/_room" component={_Room} />
          <Route path="/_home" component={_Home} />
        </Switch>
      </Router>
    </ProvideAuth>
  </div>
);

export default App;
