import React ,{Component} from 'react';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default class AmountSelecter extends Component{
  constructor(props){
    super(props);
  }

  handleClick = (e, index) => {
    let urlParams = decodeURI(window.location.search);
    let params = [];
    let dis;
    switch (index) {
      case 0: dis = 10; break;
      case 1: dis = 30; break;
      case 2: dis = this.props.events.length; break;
    }
    if(urlParams == "" && index == 0){
      document.location.href = './';
    }
    else if(urlParams == ""){
      document.location.href = `./?item=all&value=&display=${dis}&start=1`;
    }else{
      urlParams = urlParams.substring(1);
      urlParams.split('&').forEach( urlParam => {
        const param = urlParam.split('=');
        params[param[0]] = param[1];
      })
      document.location.href = `./?item=${params.item}&value=${params.value}&display=${dis}&start=1`;
    }

  }

  render(){
    return(
      <Grid container spacing = {2}>
        <Grid item>
          <Button variant = "outlined" onClick= {e => this.handleClick(e, 0)}>
            <Typography>１０件表示</Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button variant = "outlined" onClick= {e => this.handleClick(e, 1)}>
            <Typography>３０件表示</Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button variant = "outlined" onClick= {e => this.handleClick(e, 2)}>
            <Typography>全件表示</Typography>
          </Button>
        </Grid>
      </Grid>
    );
  }
}


export class StartSelecter extends Component{
  constructor(props){
    super(props);
    this.state = {
      params: []
    }
  }

  componentDidMount(){
    let urlParams = decodeURI(window.location.search);
    let paramsArray = [];
    if(urlParams != ''){
      urlParams = urlParams.substring(1);
      urlParams.split('&').forEach( urlParam => {
        const param = urlParam.split('=');
        console.log(param)
        paramsArray[param[0]] = param[1];
      })
    }else{
      paramsArray = null;
    }
    this.setState({ params: paramsArray })
  }

  getN = () => {
    let n = 10;
    let m = this.props.events.length;
    if(this.state.params != null)
      n = this.state.params.display;


    return parseInt(( m % n == 0 ? (m / n) : (m / n + 1)));
  }

  handleNextClick = () => {
    if(this.state.params == null)
      document.location.href = `./?item=all&value=&display=10&start=2`;
    else if(this.state.params.start >= this.getN())
      document.location.href = `./?item=${this.state.params.item}&value=${this.state.params.value}&display=${this.state.params.display}&start=1`;
    else
      document.location.href = `./?item=${this.state.params.item}&value=${this.state.params.value}&display=${this.state.params.display}&start=${Number(this.state.params.start)+1}`;
  }

  handlePrevClick = () => {
    if(this.state.params == null)
      document.location.href = `./?item=all&value=&display=10&start=${this.getN()}`;
    else if(this.state.params.start <= 1)
      document.location.href = `./?item=${this.state.params.item}&value=${this.state.params.value}&display=${this.state.params.display}&start=${this.getN()}`;
    else
      document.location.href = `./?item=${this.state.params.item}&value=${this.state.params.value}&display=${this.state.params.display}&start=${Number(this.state.params.start)-1}`;

  }

  handleNumberClick = (e, i) => {
    if(this.state.params == null)
      document.location.href = `./?item=all&value=&display=10&start=${i}`
    else
      document.location.href = `./?item=${this.state.params.item}&value=${this.state.params.value}&display=${this.state.params.display}&start=${i}`
  }

  render(){
    let list = [];
    for(let i = 0; i < this.getN(); i++)
      list.push(i)
      console.log(list)
    return(
      <Grid container spacing = {1}>
        <Grid item>
          <ButtonBase onClick = {this.handlePrevClick}>前へ</ButtonBase>
        </Grid>
        <Grid item>
          {list.map( (i, index) =>(
            <ButtonBase onClick = {e => this.handleNumberClick(e, i+1)} style = {{paddingRight: '10px', paddingLeft: '10px'}}>
              {i + 1}
            </ButtonBase>
          ))}
        </Grid>
        <Grid item>
          <ButtonBase onClick = {this.handleNextClick}>次へ</ButtonBase>
        </Grid>
      </Grid>
    );
  }
}
