import React, { Fragment, useEffect, useState } from "react";


import * as ReactBootstrap from 'react-bootstrap';

const topics = [
  {
    "topic_id":1, 
    "title":"Data Visualization Tools" 
  },
  {
    "topic_id":2, 
    "title":"Machine Learning Tools" 
  },
]

const use_cases = [
  {
    "use_case_id":1, 
    "use_case":"Desktop Analytics",
    "topic_id": 1, 
  },
  {
    "use_case_id":2, 
    "use_case":"2 - Desktop Analytics",
    "topic_id": 1, 
  },
  {
    "use_case_id":3, 
    "use_case":"3 - Desktop Analytics",
    "topic_id": 1, 
  },
  {
    "use_case_id":4, 
    "use_case":"4 - Desktop Analytics",
    "topic_id": 1, 
  },
]


class Filtersection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic_index: null,
      use_cases: null,
    };
    
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/ddt/usecases')
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      this.setState({ use_cases: data })
    })
    .catch(console.log)
  }


  render() {
    const topic_items = topics.map(function(topic){
      return  <ReactBootstrap.Dropdown.Item href={"/" + topic.topic_id}> {topic.title} </ReactBootstrap.Dropdown.Item>
    });

    const use_case_items = use_cases.map(function(use_case){
      return  <ReactBootstrap.Form.Check  custom type='checkbox' id={use_case.use_case_id} label={use_case.use_case} />
    });
    

    return (
      <>
      <TopicList></TopicList>
      <ReactBootstrap.Dropdown>
        <ReactBootstrap.Dropdown.Toggle variant="success" id="dropdown-basic"> Select a Topic </ReactBootstrap.Dropdown.Toggle>
        <ReactBootstrap.Dropdown.Menu> {topic_items} </ReactBootstrap.Dropdown.Menu>
      </ReactBootstrap.Dropdown>
      <h2>Use Cases</h2>
      <ReactBootstrap.Form>
       {use_case_items}
      </ReactBootstrap.Form>
     
      </>
    );
  }
}

export default Filtersection;