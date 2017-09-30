import React from 'react'
import reactStyles from 'react-css-modules'
import LazyLoad from 'react-lazyload'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import tmdb from 'global-assets/tmdb.svg'
import globalStyles from 'global-styles'
import styles from './style'


@withStyles({ ...styles, ...globalStyles })
@reactStyles({ ...styles, ...globalStyles }, { allowMultiple: true })
export default class Footer extends React.Component {

  render() {
    return (
      <footer styleName="footer">
        <div styleName="container">
          <div styleName="row content">
            <div styleName="col-xs-6">
              <div styleName="copy">
                &copy; 2017 Pranesh Ravi
              </div>
            </div>
            <div styleName="col-xs-6">
              <div styleName="powered-by">
                <a href="https://themoviedb.org" target="_blank" rel="noopener noreferrer">
                  <LazyLoad
                    placeholder={<div styleName="image">Powered By</div>}
                    once
                  >
                    <img src={tmdb} alt="powered-by" />
                  </LazyLoad>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
