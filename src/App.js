import React from 'react';
import Layout from '../src/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Auth from '../src/components/auth/Auth';
import HomePage from '../src/components/homePage/HomePage';
import Quiz from '../src/components/quiz/Quiz';
import QuizCreator from '../src/components/quizCreator/QuizCreator';
import QuizList from '../src/components/quizList/QuizList';
import { connect } from 'react-redux';
import Logout from './components/logout/Logout'
import { autoLogin } from './redux/actions/auth'

class App extends React.Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {

    let routes = (
      <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/quiz-list' component={QuizList} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/' exact component={HomePage} />
          <Redirect to='/'/>
      </Switch>
    )

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/quiz-list' component={QuizList} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={HomePage} />
          <Redirect to='/'/>
        </Switch>
      )
    }

    return (
      <Layout>
        { routes }
      </Layout>
    )

  }
}

function mapStateToPropse(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
} 

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch( autoLogin() )
  }
}

export default withRouter(connect(mapStateToPropse, mapDispatchToProps)(App));
