   
class ProductList extends React.Component{
      constructor(props){
          super(props);
          this.state={product:[]};
          this.handleClick=this.handleClick.bind(this);
      }
      handleClick(){
         console.log('remove');
      }
      componentDidMount(){
         this.GetProduct();
      }
      GetProduct(){
           fetch("/api/supplier")   
            .then( results=>{ return results.json(); } )
            .then( data=>{
                let product  = data.map((pro,key)=>{
                                  return (
                                      <tr>
                                          <td >{key}</td>
                                          <td>{pro.name}</td>
                                          <td>{pro._id}</td>
                                      </tr>
                                  );
                             }); 
                this.setState({product:product});
               
            });
      }
      render(){
       
         return (<table >
                  <tr><th>Name product</th>
                    <th></th>
                    <th></th>
                  </tr>
                   {this.state.product}
                 </table>);
      }

  }
  ReactDOM.render(
        <ProductList />,
        document.getElementById("aa")
    );