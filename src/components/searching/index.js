import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import '../components.css';

export default class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      key: null
    }
  }

  handleKeyChange = (e) => {
    this.setState({ key: e.target.value })
  }

  handleButtonClick = () => {
    if (this.state.key === null)
      document.location.href = './';
    else
      document.location.href = `./?item=all&value=${this.state.key}&display=10&start=1`;
  }

  render(){
    return(
      <Box
        className = "search_box1"
        border = {1}
        borderRadius = {10}
        boxShadow = {1}
        display = "flex"
        justifyContent = "center"
        alignItems = "center"
      >
        <TextField
          id = "search"
          type = "text"
          placeholder = "キーワード検索"
          onChange = {this.handleKeyChange}
        />
        <Fab
          className = "s_icon"
          color = "default"
          aria-label = "Search"
          style = {{marginTop: '5px',marginLeft: '20px'}}
          onClick = {this.handleButtonClick}
          >
          <SearchIcon />
        </Fab>
      </Box>
    );
  }
}

export class Search_Time extends Component{
  constructor(){
    super();
    this.state = {
      anchorEl: null,
      date: Date
    }
  }

  componentDidMount(){
    this.setState({ date: this.getTodayFormat() })
  }

  handleClick = (e) => {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleDateChange = (e) => {
    this.setState({ date: e.target.value })
  }

  handleButtonClick = (e) => {
    if (this.state.key === null)
      document.location.href = './';
    else
      document.location.href = `./?item=date&value=${this.state.date}&display=10&start=1`
  }

  getTodayFormat = () => {
    const today = new Date();
    const year = `${today.getFullYear()}`;
    const month = today.getMonth() + 1 < 10 ?
      `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`;
    const day = today.getDate() < 10 ?
      `0${today.getDate()}` : `${today.getDate()}`;
    return(
      `${year}-${month}-${day}`
    );
  }

  render(){
    return(
      <div>
        <Button
          className = "search_box2"
          color = "inherit" variant="outlined"
          onClick = {this.handleClick}
        >
          <Typography variant = "h6">日付で検索</Typography>
        </Button>
        <Menu
          id = "long-menu"
          anchorEl = {this.state.anchorEl}
          open = {Boolean(this.state.anchorEl)}
          onClose = {this.handleClose}
        >
          <Grid container
            direction  = "row"
            alignItems = "center"
            justifyContent = "center"
            className = "search_grid"
          >
            <Grid item>
              <TextField
                id = "date"
                type = "date"
                defaultValue = {this.getTodayFormat()}
                onChange = {this.handleDateChange}
              />
            </Grid>
            <Grid item style = {{paddingLeft: '30px'}}>
              <Fab
                className = "s_icon"
                color = "default"
                aria-label = "Search"
                onClick = {this.handleButtonClick}
                >
                <SearchIcon />
              </Fab>
            </Grid>
          </Grid>
        </Menu>
      </div>
    );
  }
}

export class Search_Category extends Component{
  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
      categories: []
    }
  }

  componentDidMount(){
    let allCategories = [];
    this.props.events.map( event =>
      allCategories.push(event.category)
    );

    this.setState({ categories:
      allCategories.filter( (x, i, self) => self.indexOf(x) === i && x != "")
    });
  }

  handleClick = (e) => {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleItemClick = (e, category) => {
    document.location.href = `./?item=category&value=${category}&display=10&start=1`
  }

  render(){
    return(
      <div>
        <Button
          className = "search_box2"
          color = "inherit"
          variant="outlined"
          onClick = {this.handleClick}
        >
          <Typography variant = "h6">カテゴリで検索</Typography>
        </Button>
        <Menu
          id="long-menu"
          className = "menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          keepMounted
        >
          {this.state.categories.map( category => (
            <MenuItem
              onClick = {e => this.handleItemClick(e, category)}
            >
              {category}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export class Search_Address extends Component{
  constructor(props){
    super(props);
    this.state = {
      anchorEl:  null,
      address: []
    }
  }

  componentDidMount(){
    let allAddress = [];
    this.props.events.map( event =>
      allAddress.push(event.address)
    );

    this.setState({ address:
      allAddress.filter( (x, i, self) => self.indexOf(x) === i && x != "")
    });
  }

  handleClick = (e) => {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleItemClick = (e, address) => {
    document.location.href = `./?item=address&value=${address}&display=10&start=1`
  }

  render(){
    return(
      <div>
        <Button
          className = "search_box2"
          color = "inherit"
          variant="outlined"
          onClick = {this.handleClick}
        >
          <Typography variant = "h6">住所で検索</Typography>
        </Button>
        <Menu
          id="long-menu"
          className = "menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          keepMounted
        >
          {this.state.address.map( address => (
            <MenuItem
              onClick = {e => this.handleItemClick(e, address)}
            >
              {address}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

}
