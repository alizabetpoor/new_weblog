import "./App.css";
import Layout from "./layout/Layout";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <div className="App flex flex-col items-center">
      <Layout>
        <Switch>
          <Route path="/" component={HomePage} exact />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
