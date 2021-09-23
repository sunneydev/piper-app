import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProvideAuth } from "./Auth";
import Register from "./pages/Register";
import Room from "./pages/Room";
import Home from "./pages/Home";
import _Room from "./pages/_Room";

const App = () => (
  <ProvideAuth>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/_room" component={_Room} />
        <Route exact path="/register" component={Register} />
        <Route path="/room/:roomId" component={Room} />
      </Switch>
    </Router>
  </ProvideAuth>
);

export default App;
