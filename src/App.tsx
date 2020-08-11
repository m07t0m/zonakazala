import React from 'react';
import './App.css';
import MyModule from './MyModule';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GameOfLife from './GameOfLife';

export interface IRouter {
  history: any;
  location: any;
  match: any;
  staticContentx?: any;
}

export const AppContext = React.createContext({});

function App() {

  return (
    
      <div>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/game" render={(router: IRouter) => {
                  return (
                      <AppContext.Provider value={router}>
                          <GameOfLife/>
                      </AppContext.Provider>
                  );
              }} />
              <Route path="/" render={(router: IRouter) => {
                  return (
                      <AppContext.Provider value={router}>                        
                        <MyModule/>  
                      </AppContext.Provider>
                  );
              }} />
            </Switch>   
          </div>
        </Router>
    </div>
  );
}

export default App;
