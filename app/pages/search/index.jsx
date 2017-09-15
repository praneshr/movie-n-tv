import globalStyles from 'global-styles'
import ReactCSS from 'react-css-modules'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import reactEasyBind from 'react-easy-bind'
import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'
import { resolveUrl } from '../../utils'
import { uiStates, uiActions } from '../../redux-connect'
import Cards from '../../components/movie-cards/async'
import styles from './style.scss'
import CardSkeleton from '../../components/card-skeleton'


@connect(uiStates, uiActions)
@withStyles(styles)
@ReactCSS({ ...globalStyles, ...styles }, { allowMultiple: true })
@reactEasyBind
class Search extends Component {


  componentDidMount() {
    this.fetchData(this.props)
    this.search.focus()
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps)
  }

  onChange(e) {
    if(this.id) {
      window.clearTimeout(this.id)
    }
    const val = e.target.value
    this.id = window.setTimeout(() => {
      if (val) {
        browserHistory.push(`/search?query=${val}&page=1`)
      }
    }, 800);
  }

  onSubmit(e) {
    this.search.blur()
    e.preventDefault()
  }

  fetchData(props) {
    const {
      ui: {
        search,
      },
      location: {
        query = {},
      },
    } = props
    const defaultQueries = {
      search_type: 'ngram',
    }
    if (!search[`${query.query}__${query.page}` || ''] && query.query && query.page) {
      props.actions.getSearch({ ...defaultQueries, ...query })
      .then(({ data }) => {
        props.actions.search({
          [`${query.query}__${query.page}`]: data,
        })
      })
    }
  }

  render() {
    const {
      ui: {
        search,
      },
      location: {
        query: {
          query = '',
          page = 1,
        },
      },
    } = this.props
    const data = search[`${query}__${page}`]
    return (
      <div styleName="search">
        <div styleName="container">
          <div styleName="row">
            <div styleName="col-sm-12">
              <div styleName="title">
                Search
              </div>
              <div styleName="input-container">
                <form onSubmit={this.onSubmit}>
                  <input
                    onChange={this.onChange}
                    ref={el => (this.search = el)}
                    defaultValue={query}
                    type="text"
                    placeholder="Find Movies, TV Shows, and more..." />
                </form>
              </div>
            </div>
          </div>
          <div styleName="row">
            <div styleName="col-sm-12 data">
              {
                query
                ? data
                    ? <div>
                      <div styleName="stats">
                        <b>{(data || {}).total_results}</b> results
                      </div>
                      <Cards
                        results={data.results}
                        resolveLink={resolveUrl} />
                      <div>
                        <div styleName="button-container">
                          {
                            page > 1
                            && <div className="back">
                              <Link to={`/search?query=${query}&page=${parseInt(page, 10) - 1}`}>
                                <button styleName="button-primary">
                                  <i styleName="nc-icon nc-tail-triangle-left"></i>
                                  <span styleName="hidden-xs hidden-sm">Back</span>
                                </button>
                              </Link>
                            </div>
                          }
                          {
                            page < data.total_pages
                            && <div className="next">
                              <Link to={`/search?query=${query}&page=${parseInt(page, 10) + 1}`}>
                                <button styleName="button-primary">
                                  <i styleName="nc-icon nc-tail-triangle-right"></i>
                                  <span styleName="hidden-xs hidden-sm">Next</span>
                                </button>
                              </Link>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  : new Array(20).fill(undefined).map((el, i) => <CardSkeleton key={i}/>)
                : ''
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Search