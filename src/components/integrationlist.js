import * as React from 'react';



class IntegrationList extends React.Component {
    constructor(props) {
      super(props);
   
      this.state = {
        integrations: this.props.integrations,

      };
    }
    componentDidMount() {
        
        
    }
 

    render() {
      let categories, filtered, filtered2, categoriesList, integrationOptions
      if(this.props.integrations !== undefined)
      {
        categories = this.props.integrations[0]
        if(categories ===undefined || categories === null){
          
        }
        else{
          categoriesList = Object.keys(categories) 
          filtered = categoriesList.filter(function (str) { return str.indexOf("tool") === -1; });
          filtered2 = filtered.filter(function(str) {return str.indexOf("id") === -1;});
          integrationOptions = filtered2.map((item, index) => (
            <div className={"integrationCheckbox"} key={index}>
                  <label>
                  <input
                  type='checkbox' 
                  onClick={(e)=>this.props.updateStateList(e,item)}
                  /> {item}
                </label>
            </div>
          ))
        }
        
      }
      return (
        <div className={"integrationDiv"}>
            <h6 className={"filterTitle"}>Integrations</h6>
            <div className={"integrationOptionsDiv"}>
            {
              integrationOptions
            }
            </div>
     </div>
      );
    }
  }

  

export default IntegrationList