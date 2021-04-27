import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import IndexPage from './DashBoard';
import SignIn from './SingIn';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/dashboard' component={IndexPage} />
        <Route path='/' component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
