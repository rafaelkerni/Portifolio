import React from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
//import Footer from 'components/Footer';
//import Tour from '../components/Tour/index';
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from 'constants/ActionTypes';
import {isIOS, isMobile} from 'react-device-detect';
import asyncComponent from '../util/asyncComponent';
import TopNav from 'components/TopNav';

const PrivateRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest} render={props => (
      localStorage.getItem('data_sellermob') ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{  pathname: '/app/login' }}
        />
      )
    )}
    />
  );
};

class App extends React.Component {

  render() {
    const {match, drawerType, navigationStyle, horizontalNavPosition} = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';

    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height')
    }
    else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height')
    }

    return (
      <div className={`app-container ${drawerStyle}`}>
        <Sidebar/>
        <div className="app-main-container">
         { !this.props.location.pathname.match('/app/login') ? 
          <div
            className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER) &&
            <TopNav styleName="app-top-header"/>}
            <Header/>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) &&
            <TopNav/>}
          </div> : false
         }

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
                <PrivateRoute path={`${match.url}/Configuracoes`}
                         component={asyncComponent(() => import('./routes/Configuracoes'))}/>
                 <PrivateRoute path={`${match.url}/Produtos`}
                         component={asyncComponent(() => import('./routes/Produtos'))}/>
                 <PrivateRoute path={`${match.url}/Categorias`}
                         component={asyncComponent(() => import('./routes/Categorias'))}/>
                  <PrivateRoute path={`${match.url}/Grupos`}
                         component={asyncComponent(() => import('./routes/Grupos'))}/>          
                  <PrivateRoute path={`${match.url}/Pessoas`}
                         component={asyncComponent(() => import('./routes/Pessoas'))}/>                      
                  <Route path={`${match.url}/login`}
                         component={asyncComponent(() => import('./routes/Login'))}/>                  
                  <Route component={asyncComponent(() => import('components/Error404'))}/>
              </Switch>
            </div>
            {/*<Footer/>*/}
          </main>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({settings}) => {
  const {drawerType, navigationStyle, horizontalNavPosition} = settings;
  return {drawerType, navigationStyle, horizontalNavPosition}
};
export default withRouter(connect(mapStateToProps)(App));