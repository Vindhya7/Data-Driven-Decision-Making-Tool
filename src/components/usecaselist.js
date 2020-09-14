import * as React from 'react';



class IntegrationList extends React.Component {
    constructor(props) {
      super(props);
   
      this.state = {
        usecases: this.props.usecases,
        filteredChoices:[],

    };
    }
    componentDidMount() {
        
    }    
    render() {
      return (
        <div className={"usecaseDiv"}>
            <h6 className={"filterTitle"}>Use Cases</h6>
          <form>
          {
              Object.keys(this.props.usecases).map((item, index)=>{  
              return (
                <div  key={item} >
                  <label>
                  <input 
                 
                  type='checkbox' 
                  onClick={(e)=>this.props.updateStateList(e,this.props.usecases[item].title)}
                  /> {this.props.usecases[item].title}
                </label>
                </div>
              ) 
              })  
          }

          </form>
        </div>
      );
    }
  }

  

export default IntegrationList