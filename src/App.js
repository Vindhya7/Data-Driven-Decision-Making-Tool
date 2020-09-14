import React, { Component } from "react";
import clsx from "clsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from './hpelogo.png';



import TopicList from './components/topiclist';
import ToolList from './components/toollist';
import IntegrationList from './components/integrationlist';
import UseCaseList from './components/usecaselist';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';



const drawerWidth = 300;

const styles = (theme) => ({

  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'white',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    height:'90px',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
})

class App extends Component {
  constructor(props) {
    super(props);
    this.updateIntegrationStateList = this.updateIntegrationStateList.bind(this)
    this.updateUseCaseStateList = this.updateUseCaseStateList.bind(this)
    this.changeTopic = this.changeTopic.bind(this)
    this.calculateScore = this.calculateScore.bind(this)
    this.state = {
      //main 
      topicsMain: [],
      integrationsMain:[],
      usecasesMain:[],
      toolsMain:[],
      kbMain:[],
      //used
      topics: [],
      integrations:[],
      usecases:[],
      tools:[],
      kb:[],
      toolSummary:{},

      maxSelectNum:0,
      scores:{},
      integrationChoices:[],
      useCaseChoices:[],
      currTopic:null,
      open: false,
      title: "Data-Driven Decision Tool",
    };
  }
  async updateIntegrationStateList(e, value){
    let tempMaxSelectNum = this.state.maxSelectNum;
    if (e.target.checked){
      //append to array
      tempMaxSelectNum = tempMaxSelectNum +1;
      await this.setState({
        integrationChoices: this.state.integrationChoices.concat([value]),
        maxSelectNum: tempMaxSelectNum,
      })
    } else {
      tempMaxSelectNum = tempMaxSelectNum -1
      //remove from array
      await this.setState({
        integrationChoices : this.state.integrationChoices.filter(function(val) {return val!==value}),
        maxSelectNum: tempMaxSelectNum,
      })
    }
    this.calculateScore()
  }
  async calculateScore(){


    for(var i = 0; i< this.state.tools.length;i++){
      let count, maxCount;
      count = 0 ;
      maxCount =0;
      let tempTool = this.state.tools[i];

      tempTool.plus = [];
      tempTool.minus = [];

       //use case checking

      let kbs = [];
      for (var j = 0; j < this.state.kb.length; j++) {

        if(this.state.kb[j].tool.id === this.state.tools[i].id) {
          kbs.push(this.state.kb[j].use_case.title);
        }

      }

      this.state.useCaseChoices.forEach((useCase) => {
        if(kbs.includes(useCase)){
          count += 1;
          tempTool.plus.push(useCase);
        }
        else{
          tempTool.minus.push(useCase);
        }
      })


      //integration checking
      for(var j=0; j<this.state.integrations.length; j++){
        if(this.state.integrations[j].tool.id === this.state.tools[i].id){
          for(var k =0; k<this.state.integrationChoices.length;k++){
            if(this.state.integrations[j][this.state.integrationChoices[k]] === true){
              tempTool.plus.push(this.state.integrationChoices[k]);
              count+=1
            }
            else{
              tempTool.minus.push(this.state.integrationChoices[k]);
            }
          }
        }
      }

      //update scores
      let tempScore = this.state.scores;
      let tempTools = this.state.tools;
      tempTools[i] = tempTool;
      tempTools[i].score = count;

      tempScore[this.state.tools[i].id] = count;
      await this.setState({
        scores: tempScore,  
        tools:tempTools,
      })
    }


  let tempTools = this.state.tools;
  tempTools.sort((a,b)=> (a.score>b.score)? -1:1);
  await this.setState({
    tools:tempTools,
  })
    //console.log("tools",this.state.tools);
}
  async updateUseCaseStateList(e, value){
    let tempMaxScore;
    tempMaxScore = this.state.maxSelectNum;
    if (e.target.checked){
      //append to array
      tempMaxScore = tempMaxScore +1;
      await this.setState({
        maxSelectNum: tempMaxScore,
        useCaseChoices: this.state.useCaseChoices.concat([value]),
      })
    } else {
      //remove from array
      tempMaxScore = tempMaxScore -1 ;
      await this.setState({
        maxSelectNum: tempMaxScore,
        useCaseChoices : this.state.useCaseChoices.filter(function(val) {return val!==value})
      })
    }
    this.calculateScore()
  }

  async changeTopic(event){
    let tempTitle = "Data-Driven Decision Tool";

    if(event.target.value != -1) tempTitle = tempTitle.concat(": ", this.state.topics[event.target.value-1].title);

    await this.setState({
      currTopic:event.target.value,
      scores: {},
      maxSelectNum:0,
      title: tempTitle
    })

    let toolsTemp =[]
    for(var i = 0; i < this.state.toolsMain.length; i++){
      if(this.state.toolsMain[i].topic.id == this.state.currTopic){
        toolsTemp.push(this.state.toolsMain[i])
      } 
    }
    let kbTemp =[]
    for(var i = 0; i < this.state.kbMain.length; i++){
      if(this.state.kbMain[i].tool['topic']['id'] == this.state.currTopic){
        kbTemp.push(this.state.kbMain[i])
      } 
    }
    let usecasesTemp=[]
    for(var i = 0; i < this.state.usecasesMain.length; i++){
      if(this.state.usecasesMain[i]['topic']['id'] == this.state.currTopic){
        usecasesTemp.push(this.state.usecasesMain[i])
      } 
    }
    let integrationsTemp=[]
    for(var i = 0; i < this.state.integrationsMain.length; i++){
      if(this.state.integrationsMain[i]['tool']['topic']['id'] == this.state.currTopic){
        integrationsTemp.push(this.state.integrationsMain[i])
      } 
    }

    this.setState({
      tools: toolsTemp,
      kb: kbTemp,
      usecases: usecasesTemp,
      integrations: integrationsTemp,
      scores:[],
      integrationChoices:[],
      useCaseChoices:[],
    })


  }

  async componentDidMount() {
    fetch('http://localhost:8000/api/ddt/topics')
    .then(res => res.json())
    .then((data) => {
      this.setState({ topics: data })
      // console.log("Topics: ", this.state.topics);
    //  this.setState({ currTopic: data[0].title })
    })
    .catch(console.log)

    fetch('http://localhost:8000/api/ddt/usecases')
    .then(res => res.json())
    .then((data) => {
      this.setState({ usecasesMain: data })
      /*console.log("UsecasesMain: ", this.state.usecasesMain);*/
    })
    .catch(console.log)

    fetch('http://localhost:8000/api/ddt/integrations')
    .then(res => res.json())
    .then((data) => {
      this.setState({ integrationsMain: data })
      // console.log("IntegrationsMain: ", this.state.integrationsMain);
    })
    .catch(console.log)

    fetch('http://localhost:8000/api/ddt/tools')
    .then(res => res.json())
    .then((data) => {
      this.setState({ toolsMain: data })
      //console.log("ToolsMain: url ", data);
    })
    .catch(console.log)


    fetch('http://localhost:8000/api/ddt/kb')
    .then(res => res.json())
    .then((data) => {
      this.setState({ kbMain: data })
      // console.log("kbMain: ", this.state.kbMain);
    })
    .catch(console.log)

  }

  function
  handleDrawerOpen = () => {
    this.setState( {open: true} );
  };

  function
  handleDrawerClose = () => {
    this.setState( {open: false} );
  };
  
  render() {
    const {classes} = this.props;

    return (

        <div className={classes.root}>
          <CssBaseline />
          <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: this.state.open,
              })}
          >
            <Toolbar className={"header"}>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon style={{color: '#00b38f'}}/>
              </IconButton>
              {/*<img className={"logo"} src={logo} alt="Logo" />*/}
              <Typography className={"headerText"} variant="h6" >
                {this.state.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={this.state.open}
              classes={{
                paper: classes.drawerPaper,
              }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
              <TopicList topics={this.state.topics} changeTopic={this.changeTopic} currTopic={this.state.currTopic}/>
              <Divider />
              <Divider />
              <IntegrationList topic={this.state.currTopic} hive={this.state.hive } updateStateList={this.updateIntegrationStateList} integrations={this.state.integrations}/>
              <Divider/>
              <UseCaseList topic={this.state.currTopic} hive={this.state.hive } updateStateList={this.updateUseCaseStateList} filters={this.state.filters} usecases={this.state.usecases}/>

          </Drawer>
          <main
              className={clsx(classes.content, {
                [classes.contentShift]: this.state.open,
              })}
          >
            <div className={classes.drawerHeader} />

            <div className={"optionsDiv"}>
              <ToolList tools={this.state.tools} maxScore={this.state.maxSelectNum} scores={this.state.scores} useCaseChoices={this.state.useCaseChoices} integrationChoices={this.state.integrationChoices}/>
            </div>

          </main>
        </div>
    );

  }
}

export default withStyles(styles, {withTheme: true})(App);
