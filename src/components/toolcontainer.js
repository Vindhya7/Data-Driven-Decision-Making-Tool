import React from 'react'
import './styles.css'
import { withStyles } from '@material-ui/core/styles';

import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const styles = ((theme) => ({
  root: {
    green: theme.palette.getContrastText(green[500]),
    red:'#fb4246',
    yellow:'#fca830',
    blue:'',

  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  row:{
    borderTop: '7px solid #fafafa',

  }

}));


class ToolContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        score: 0,
        criteria:[],
        open: false,
    };
  }

  componentDidMount() {

  }

  function
  openModal=()=>{
    this.setState({ open: true });
  }

  function
  handleClose = () => {
    this.setState( {open: false} );
  };


  render() {

    const {classes} = this.props;

    let text;
    let modal;

    if(this.props.plus || this.props.minus){
      modal = <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          tool = {this.props}
          BackdropProps={{
            timeout: 500,
          }}
      >
        <Fade in={this.state.open}>
          <div className={classes.paper}>
            <h4 id="transition-modal-title">{this.props.tool_name}</h4>
            {this.props.plus.map((plus) => {
              return <li style={{listStyle: 'none', color: '#1fc482'}}> + {plus}</li>
            })}

            {this.props.minus.map((minus) => {
              return <li style={{listStyle: 'none', color: '#fb4246'}}> - {minus}</li>
            })}
            <a href={this.props.information} target="_blank">Documentation</a>
          </div>
        </Fade>
      </Modal>;
    }else{
      modal = <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          tool = {this.props}
          BackdropProps={{
            timeout: 500,
          }}
      >
        <Fade in={this.state.open}>
          <div className={classes.paper}>
            <h4 id="transition-modal-title">{this.props.tool_name}</h4>
            <a href={this.props.information} target="_blank">Documentation</a>
          </div>
        </Fade>
      </Modal>;

    }

    // this.calculateScore
    let percent;

    if(this.props.maxScore){
      percent = this.props.scores[this.props.tool_id] / this.props.maxScore;
    }
    else{
      percent = 10;
    }

    if(percent == 10){

      text =  <TableRow className={classes.row} >
                  <TableCell align="left">{this.props.tool_name}</TableCell>
                  <TableCell align="left">{this.props.scores[this.props.tool_id]}/{this.props.maxScore}</TableCell>
                  <TableCell align="left" >
                    <div style={{backgroundColor:'cornflowerblue', padding: '15px', borderRadius:'15px', width:'50%'}}>

                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={this.openModal} variant="contained" size="small" color={classes.root.red} style={{fontSize: 'x-small'}}>
                    Learn More
                    </Button>
                    {modal}
                  </TableCell>
              </TableRow>

    }
    else if(percent < .34 ){
      text =  <TableRow className={classes.row} >
        <TableCell align="left">{this.props.tool_name}</TableCell>
        <TableCell align="left">{this.props.scores[this.props.tool_id]}/{this.props.maxScore}</TableCell>
        <TableCell align="left" >
          <div style={{backgroundColor:'#fb4246',  padding: '15px', borderRadius:'15px', width:'50%'}}>

          </div>
        </TableCell>
        <TableCell align="right">
          <Button onClick={this.openModal} variant="contained" size="small" color={classes.root.red} style={{fontSize: 'x-small'}}>
            Learn More
          </Button>
          {modal}
        </TableCell>
      </TableRow>
    }
    else if(percent <= .67){
      text =  <TableRow className={classes.row} >
        <TableCell align="left">{this.props.tool_name}</TableCell>
        <TableCell align="left">{this.props.scores[this.props.tool_id]}/{this.props.maxScore}</TableCell>
        <TableCell align="left" >
          <div style={{backgroundColor:'#fca830',  padding: '15px', borderRadius:'15px', width:'50%'}}>

          </div>
        </TableCell>
        <TableCell align="right">
          <Button onClick={this.openModal} variant="contained" size="small" color={classes.root.red} style={{fontSize: 'x-small'}}>
            Learn More
          </Button>
          {modal}
        </TableCell>
      </TableRow>
    }
    else{
      text =  <TableRow className={classes.row} >
        <TableCell align="left">{this.props.tool_name}</TableCell>
        <TableCell align="left">{this.props.scores[this.props.tool_id]}/{this.props.maxScore}</TableCell>
        <TableCell align="left" >
          <div style={{backgroundColor:'#1fc482',  padding: '15px', borderRadius:'15px', width:'50%'}}>

          </div>
        </TableCell>
        <TableCell align="right">
          <Button onClick={this.openModal} variant="contained" size="small" color={classes.root.red} style={{fontSize: 'x-small'}}>
            Learn More
          </Button>
          {modal}
        </TableCell>
      </TableRow>
    }


    return (


          <TableBody style={{border: '4px solid #fafafa'}} >
          {text}
          </TableBody>

    );
  }

}

export default withStyles(styles)(ToolContainer)