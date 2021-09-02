import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import 'antd/dist/antd.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import './css/global/resets.css';
import './css/global/colors.css';
import { store } from './store';
import Navbar from './components/Navbar';
import Wrapper from './components/Wrapper';
import Home from './components/Home';
import Login from './components/LoginWithModal';
import SignUp from './components/SignUpWithModal';
import Default from './components/Default';
import Middleware from './components/Middleware';


export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <Middleware>
                    <Navbar />
                    <Wrapper>
                        <Switch>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <Route exact path="/signup">
                                <SignUp />
                            </Route>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route>
                                <Default />
                            </Route>
                        </Switch>
                    </Wrapper>
                </Middleware>
            </Router>
        </Provider>
    );
}