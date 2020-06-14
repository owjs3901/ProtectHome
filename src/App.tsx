import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main'

function App() {
  return (
      <BrowserRouter>

        <Switch>
          <Route exact path='/' component={Main}/>
          {/*<Route path='/login' component={Login}/>*/}
          {/*<Route path='/info/:title' component={Info}/>*/}
          {/*<Route component={Error404}/>*/}
        </Switch>
      </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
