/**
 * Created by danielhollcraft on 4/30/17.
 */
import ReactGA from 'react-ga';
import { config } from 'config'; // eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize(config.googleAnalyticsId);

  exports.onRouteUpdate = (state, page, pages) => { // eslint-disable-line
    ReactGA.set({page: state.pathname});
    ReactGA.pageview(state.pathname);
  };
}