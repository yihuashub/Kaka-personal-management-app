import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListItemsComponent from './components/Item/ListItemsComponent';
import HeaderComponent from './components/HeaderAndMenu/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateItemComponent from './components/Item/CreateItemComponent';
import ViewItemComponent from './components/Item/ViewItemComponent';
import CreateCategoryComponent from "./components/Category/CreateCategoryComponent";
import UserProfileComponent from "./components/UserProfileComponent";
import {Container} from "@mui/material";

function App() {
    return (
        <div>
            <Router>
                <HeaderComponent/>
                <Container style={{paddingTop:"2vh"}}>
                    <Switch>
                        <Route path="/" exact component={ListItemsComponent}></Route>
                        <Route path="/items" component={ListItemsComponent}></Route>
                        <Route path="/add-item/:id" component={CreateItemComponent}></Route>
                        <Route path="/view-item/:id" component={ViewItemComponent}></Route>
                        <Route path="/add-category/:id" component={CreateCategoryComponent}></Route>
                        {/* <Route path = "/update-item/:id" component = {updateItemComponent}></Route> */}
                        <Route path="/profile" component={UserProfileComponent}></Route>
                    </Switch>
                </Container>
                <FooterComponent/>
            </Router>
        </div>

    );
}

export default App;
