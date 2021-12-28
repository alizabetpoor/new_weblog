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
import NewPostPage from "./pages/NewPostPage";
import CategoryPage from "./pages/CategoryPage";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "react-toast-notifications";
import PersonalinfoPage from "./pages/PersonalinfoPage";
function App() {
  return (
    <div className="App flex flex-col items-center">
      <ToastProvider>
        <AuthProvider>
          <Layout>
            <ScrollToTop />
            <Switch>
              <Route path="/" component={HomePage} exact />

              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/post/:id" component={PostPage} />
              <Route path="/userinformation" component={PersonalinfoPage} />
              <Route path="/category/:category" component={CategoryPage} />
              <Route path="/profile/:username" component={Profile} />
              <PrivateRoute>
                <Route path="/newpost" component={NewPostPage} />
              </PrivateRoute>
              <Route path="" component={NotFoundPage} />
            </Switch>
          </Layout>
        </AuthProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
