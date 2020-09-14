import React from 'react'
import './styles.css'
import Typography from "@material-ui/core/Typography";

class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {


  }


  render() {

    let topics2;
    if (this.props.topics) {
      topics2 = this.props.topics.map((topic) => {
        return (<option key={topic.id} onChange={(e) => this.props.changeTopic(e)}
                        value={topic.id}>{topic.title}</option>);

      })
    }
    let topicTitle;
    if (this.props.currTopic === undefined || this.props.currTopic === null) {

    } else {
      for (var i = 0; i < this.props.topics.length; i++) {
        if (this.props.topics[i].id == this.props.currTopic) {
          topicTitle = this.props.topics[i].title
        } else {
          topicTitle = 'Invalid Topic'
        }
      }
    }
    return (
        <div className={"topicSection"}>
          <h6>Select a Topic</h6>
          <div className={"dropdownMenu"}>
            <select className={"selectButton"} onChange={(e) => this.props.changeTopic(e)}
                    defaultValue={this.props.currTopic || "Select"}>
              {topics2}
              <option key='a' onChange={(e) => this.props.changeTopic(e)} value="-1">...</option>
            </select>
          </div>
        </div>

    );

  }
}

export default TopicList
