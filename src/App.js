import React, {Component} from 'react';
import './App.css';
import './components/components.css';
import Header, {Sub_Header} from './components/header';
import Contents, {Detailed_Contents} from './components/contents';
import Search, {Search_Time, Search_Category, Search_Address} from './components/searching';
import AmountSelecter, {StartSelecter} from './components/display';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class App extends Component {
  events = null;
  filterdEvents = null;
  params = [];
  n = 10;
  s = 1;
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    }
    fetch(this.props.url)
    .then( res => res.json() )
    .then( res => this.setState({ events: res }) );
  }

  setEvents(){
    let urlParams;
    if(window.location.search != "")
      urlParams  = decodeURI(window.location.search);
    if(window.location.pathname == '/detailed'){
      urlParams = urlParams.substring(1).split('=');
      this.params[urlParams[0]] = urlParams[1]
    }else if(urlParams == "" || urlParams == null){
      this.events = this.state.events;
    }else if(urlParams != "" || urlParams != null){
      urlParams = urlParams.substring(1);
      urlParams.split('&').forEach( urlParam => {
        const param = urlParam.split('=');
        this.params[param[0]] = param[1];
      })
      if(this.params.item == 'all'){
        console.log(this.params)
        this.events = this.state.events.filter( event => {
          return event.event_name.toLowerCase().search( this.params.value.toLowerCase() ) !== -1
              || event.description.toLowerCase().search( this.params.value.toLowerCase() ) !== -1
              || event.remarks.toLowerCase().search( this.params.value.toLowerCase() ) !== -1
              || event.category.toLowerCase().search( this.params.value.toLowerCase() ) !== -1
              || event.start_date.toLowerCase().search( this.params.value.toLowerCase() ) !== -1
              || event.end_date.toLowerCase().search( this.params.value.toLowerCase() ) !== -1
              || event.contact.toLowerCase().search( this.params.value.toLowerCase() ) !== -1
              || event.contact_phone_number.toLowerCase().search( this.params.value.toLowerCase() ) !== -1
              || event.event_place.toLowerCase().search( this.params.value.toLowerCase() ) !== -1
              || event.event_place_url.toLowerCase().search( this.params.value.toLowerCase() ) !== -1
              || event.address.toLowerCase().search( this.params.value.toLowerCase() ) !== -1
              || event.mail_address.toLowerCase().search( this.params.value.toLowerCase() ) !== -1
              || event.transportation.toLowerCase().search( this.params.value.toLowerCase() ) !== -1
        })
      }else if(this.params.item == 'date'){
        const paramsDate = new Date(this.params.value);
        this.events = this.state.events.filter( event =>{
          const start = new Date(event.start_date);
          const end = new Date(event.end_date);
          return paramsDate >= start && paramsDate <= end
        })
      }else{
        this.events = this.state.events.filter( event => {
          return event[this.params.item] == this.params.value
        })
      }
    }
  }

  setAmount(){
    if(window.location.pathname != '/detailed'){
      if(window.location.search != ""){
        this.n = this.events.length <= this.params.display ? this.events.length : this.params.display;
        this.s = this.params.start;
      }
      this.filterdEvents = this.events.filter( (event, index) => {
        return index < this.n * this.s && index >= this.n * (this.s - 1);
      })
    }
  }

  render() {
    this.setEvents();
    this.setAmount();
    if(this.state.events.length <= 0){
      return <p>Loading...</p>
    }else{
      return(
        <Grid container>
          <Grid item style = {{width: '100%'}}>
            <Header />
          </Grid>
          <Grid item container className = "app_grid">
            <BrowserRouter>
              <Route exact path = '/' component = { () => (
                <Grid item style = {{margin: '20px'}}>
                  <Sub_Header />
                </Grid>
              )} />
            </BrowserRouter>
            <Grid item container className = "app_box" direction = "column">
              <Grid item container direction = "row" spacing = {10}>
                <Grid item>
                  <Search_Time/>
                </Grid>
                <Grid item>
                  <Search_Category events = {this.state.events}/>
                </Grid>
                <Grid item>
                  <Search_Address events = {this.state.events}/>
                </Grid>
              </Grid>
              <Grid item style = {{paddingTop: '40px'}}>
                <Search />
              </Grid>
            </Grid>
            <BrowserRouter>
              <Route exact path = '/' component = { () => (
                <Grid item style = {{paddingTop: '80px'}}>
                  <Grid item style = {{paddingBottom: '20px'}}>
                    <Grid item>
                      <AmountSelecter events = {this.events} style = {{maxWidth: '50%'}}/>
                      <Typography style = {{maxWidth: '40%', paddingTop: '20px', paddingLeft: '10px'}}>
                        {`${this.n * (this.s - 1) + 1}件 ~ ${this.events.lenght <= this.n * this.s ? this.events.lenght : this.n * this.s}件 / ${this.events.length}`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Contents className = "contents" events = {this.filterdEvents}/>
                  <Box className = "detailed" display = "flex" flexDirection = "row-reverse" justifyContent="flex-end">
                    <Link to = "./" underline = "always" onClick = {() => document.location.href = './'} style = {{color: '#000000'}}>
                      ホームに戻る
                    </Link>
                    <Box flexGrow = {1}>
                      <StartSelecter events = {this.events}/>
                    </Box>
                  </Box>
                </Grid>
              )} />
            <Route path = '/detailed' component = { () => (
              <Grid item style = {{paddingTop: '50px', paddingBottom: '50px'}}>
                <Detailed_Contents events = {this.state.events} name = {this.params.name} />
              </Grid>
            )} />
            </BrowserRouter>
          </Grid>
        </Grid>
      )
    }
  }
}


export default App;
