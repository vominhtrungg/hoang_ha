


//Load general
  fetch("/api/general").then( (responsive)=> responsive.json())
  .then( (responsiveJson)=>{
      ReactDOM.render(
        <Header type={responsiveJson}/>,
        document.getElementById("header-top-right")
        );
       ReactDOM.render(
         <Footer type={responsiveJson}/>,
          document.getElementById("footer")
        );
       

  });
class Header extends React.Component{
   render(){
      let g = this.props.type;
      
                return (   <ul className='font-face'>
                                          <li>
                                          <img src="/public/hoangha/general/img/icon-phone.png" alt="Hotline In ấn Hoàng Hà" />
                                          <a href="tel:{g.hotline}" title="Hotline In ấn Hoàng Hà">
                                            {g.hotline}
                                          </a>
                                        </li>
                                        <li>
                                          <img src="/public/hoangha/general/img/icon-email.png" />
                                            <a href="mailto:info@inanhoangha.com" target="_top">
                                            <p>{g.email}</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="skype:{g.skype}">
                                               <img src="/public/hoangha/general/img/icon-skype-top.png" />
                                            </a>
                                        </li>
                                        <li >
                                            <a href="{g.facebook}" target="_black">
                                              <img src="/public/hoangha/general/img/icon-facebook-top.png"/>
                                            </a>
                                        </li>
                                        <li >
                                          <a href="?lang=en">  
                                              <img src="/public/hoangha/general/img/icon-lang.png"/>
                                          </a>
                                      </li>
                                 </ul> )
                        } 
   }

   class Footer extends React.Component{
     render(){
        let f= this.props.type;
        return (<div className="container">
                                <div className="f-left">
                                  <div className="logo">
                                    <a href="#" title="In ấn Hoàng Hà" className="boxlazy">
                                      <img data-src="/public/hoangha/general/img/logo-f.jpg" src="/public/hoangha/general/img/loader.gif" alt="In Ấn Hoàng Hà" className="lazyload_not" />
                                    </a>
                                  </div>
                                </div>
                                <div className="just">
                                  <h3 className="font-face">{f.name}</h3>
                                  <p className="font-face">
                                      Xưởng In: {f.address}<br />
                                      Xưởng gia công: {f.gc}<br />
                                      [T]: <a href="tel:02838108910" title="Hotline">(84 - 8)38 10 89 10</a> - [F]: 
                                          <a href="tel:02838429718" title="Hotline">(84 - 8)38 42 97 18 </a>- [H]: 
                                          <a href="tel:0912112170" title="Hotline">09.121.121.70 (Ms Xuan)</a>
                                  </p>
                                </div>
                                <div className="f-right">
                                  <ul>
                                    <li><a href="#" title="#"><img src="/public/hoangha/general/img/icon-skype.png" /></a></li>
                                    <li><a href="#" title="#"><img src="/public/hoangha/general/img/icon-facebook.png" /></a></li>
                                  </ul>
                                  <span className="font-face">THỜI GIAN LÀM VIỆC</span>
                                  <p className="font-face">8H00 - 17H30</p>
                                </div>
                            </div>
                          );
     }
   }
  
  