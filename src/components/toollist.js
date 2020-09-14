import React from 'react'
import ToolContainer from "./toolcontainer"
import './styles.css'


import {withStyles} from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";



const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  table: {
      minWidth: 200,
    backgroundColor:'#fafafa',


  },

})

class ToolList extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {

    };
  }
  componentDidMount() {
      
      
  }
 
  
  render() {
    const {classes} = this.props;



    return (
      <div style={{minWidth: 'fit-content'}}>
        <h4>Tools</h4>

        <div >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left"><h6>Tool Name</h6></TableCell>
                  <TableCell align="right"><h6>Scores</h6></TableCell>
                  <TableCell align="right"><h6></h6></TableCell>
                  <TableCell align="right"><h6>More Information</h6></TableCell>

                </TableRow>
              </TableHead>
            {this.props.tools.map((tool) => (
                <ToolContainer key={tool.id}
                               plus={tool.plus}
                               minus={tool.minus}
                               tool_id={tool.id}
                               maxScore={this.props.maxScore}
                               information={tool.information}
                               scores={this.props.scores}
                               tool_name={tool.tool_name}>

                </ToolContainer>
            ))}
            </Table>
          </TableContainer>
        </div>


      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true}) (ToolList)