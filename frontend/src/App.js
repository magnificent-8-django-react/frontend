import React from "react";
import Login from "./components/accounts/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (<Router>
    <div className="App">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              </li>
            </ul>
          </div>
        </div>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;


// class App extends Component {
//   componentDidMount() {
//     store.dispatch(loadUser());
//   }

//   render() {
//     return (
//       <Provider store={store}>
//           <Router>
//             <Header/>
//             <Switch>
//               <Route exact path="/" component={Home}/>
//               <Route exact path="/login" component={Login}/>
//               <Route path="/register" component={Register}/>
//             </Switch>
//           </Router>
//       </Provider>
//     );
//   }
// }

// export default App;