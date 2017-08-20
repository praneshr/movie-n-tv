import React from 'react'
import ReactCSS from 'react-css-modules'

import styles from './styles'

@ReactCSS({ ...styles }, { allowMultiple: true })
export default class Genres extends React.Component {
  static propTypes = {
    data: React.PropTypes.array,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const g = this.props.data.map((g, i) => {
      return <span styleName="genre" key={i}>{g.name}</span>
    })
    return (
      <div styleName="genres">
        {g}
      </div>
    );
  }
}
