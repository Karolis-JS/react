import './App.css';
import {faFontAwesomeLogoFull} from "@fortawesome/free-regular-svg-icons";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";

import React, {useState} from "react"
import Upload from "./components/Upload";
import Home from "./components/Home";
import Recipes from "./components/Recipes";
import Navbar from "./components/Navbar";
import SingleRecipe from "./components/SingleRecipe";
import Review from "./components/Rewiev";
import UsersReview from "./components/UsersReview";
import Footer from "./components/Footer";
import FavoriteRecipes from "./components/FavoriteRecipes";
import Search from "./components/Search";


function App() {

    const [review, setReviews] = useState([])

  return (
    <div className="App">

        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route path="/upload">
                    <Upload/>
                    <Footer />
                </Route>

                <Route path="/allrecipes">
                    <Recipes/>
                    <Footer />
                </Route>

                <Route path="/search">
                    <Search/>
                    <Footer />
                </Route>

                <Route path="/favorite">
                    <FavoriteRecipes/>
                    <Footer />
                </Route>

                <Route render={({location}) => (
                    <TransitionGroup>
                        <CSSTransition
                            key={location.key}
                            timeout={300}
                            classNames="fade"
                        >
                            <Switch location={location}>
                                <Route path="/recipe/:id">
                                    <SingleRecipe/>
                                    <div className="reviewMain">
                                        <Review addReview={(e) => setReviews([e])}/>
                                        <UsersReview reviews={review}/>
                                    </div>
                                </Route>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )} />

            </Switch>

        </Router>
    </div>
  );
}

export default App;
