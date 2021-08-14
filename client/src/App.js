import Home from "./pages/Home";
import Game from "./pages/Game";

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game" component={Game} />
      </Switch>
    </Router>
  );
}

export default App;