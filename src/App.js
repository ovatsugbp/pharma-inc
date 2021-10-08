import "./App.css";
import UserProvider from "./context/userData";
import Home from "./pages/Home/index.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Modal } from "./components/Modal";

function App() {
    return (
        <Router>
            <UserProvider>
                <div className="App">
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/?page=:page" exact>
                            <Home />
                        </Route>
                        <Route path="/?page=:page&id=:id">
                            <Modal />
                        </Route>
                    </Switch>
                </div>
            </UserProvider>
        </Router>
    );
}

export default App;
