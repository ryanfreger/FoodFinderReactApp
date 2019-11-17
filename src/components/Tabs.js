import React from 'react';
import '../App.css';

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    }
  }

  //Used to set state active for active tab
  select = (i) => {
    let self = this;
    return function () {
      self.setState({
        active: i
      });
    }
  }

  renderTabs = () => {
    return React.Children.map(this.props.children, (item, i) => {
      if (i % 2 === 0) {
        let active = this.state.active === i ? 'active' : '';
        return <a onClick={this.select(i)} className={`${active} tab`}>{item}</a>;
      }
    });
  }

  renderContent() {
    return React.Children.map(this.props.children, (item, i) => {
      if (i - 1 === this.state.active) {
        return <div className='content'>{item}</div>;
      } else {
        return;
      }
    });
  }

  render() {
    return (
      <div className="tabs">
        {this.renderTabs()}
        {this.renderContent()}
      </div>
    );
  }
}