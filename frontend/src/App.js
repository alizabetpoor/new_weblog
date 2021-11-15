import "./App.css";
import Layout from "./layout/Layout";
import { Route, Switch } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import { ToastProvider } from "react-toast-notifications";
function App() {
  return (
    <div className="App flex flex-col items-center">
      <ToastProvider>
        <Layout>
          <ScrollToTop />
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/post/:id" component={PostPage} />
            <Route path="/profile/:username" component={Profile} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </Layout>
      </ToastProvider>
    </div>
  );
}

export default App;
