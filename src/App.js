import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListItemsComponent from './components/ListItemsComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateItemComponent from './components/CreateItemComponent';
import ViewItemComponent from './components/ViewItemComponent';
import CreateCategoryComponent from "./components/CreateCategoryComponent";
import UserProfileComponent from "./components/UserProfileComponent";

function App() {
    return (
        <div>
            <Router>
                <HeaderComponent/>
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={ListItemsComponent}></Route>
                        <Route path="/items" component={ListItemsComponent}></Route>
                        <Route path="/add-item/:id" component={CreateItemComponent}></Route>
                        <Route path="/view-item/:id" component={ViewItemComponent}></Route>
                        <Route path="/add-category/:id" component={CreateCategoryComponent}></Route>
                        {/* <Route path = "/update-item/:id" component = {updateItemComponent}></Route> */}
                        <Route path="/profile" component={UserProfileComponent}></Route>
                    </Switch>
                </div>
                <FooterComponent/>
            </Router>
        </div>

    );
}

export default App;
