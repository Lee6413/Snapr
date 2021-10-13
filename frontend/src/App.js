import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import LandingPage from "./components/LandingPage"
import Navigation from "./components/Navigation";
import PhotoPage from "./components/PhotoPage";
import SinglePhotoPage from "./components/SinglePhotoPage"
import "./index.css"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/photos">
            <PhotoPage />
          </Route>
          <Route path="/photos/:photoId">
            <SinglePhotoPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
