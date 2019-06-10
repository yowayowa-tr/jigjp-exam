import React ,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {flexbox, borders} from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Cards from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GetImage from './getImg';
import '../components.css';

export default class Contents extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Grid container spacing = {7} direction = "column">
        {this.props.events.map( event => (
          <Grid item>
            <Box className = "nodes" borderTop = {1} borderBottom = {1} borderColor = "grey.500">
              <Grid item container direction = "column" style = {{paddingLeft:  '20px'}}>
                <Grid item className = "node_title">
                  <Typography
                    className = "event_title_font" variant = "h6"
                    aligin = "center" noWrap = "true"
                  >
                    <Link href = {`./detailed?name=${event.event_name}`} underline = "none" style = {{color: '#000000'}}>
                      <b>{event.event_name}</b>
                    </Link>
                  </Typography>
                </Grid>
                <Grid item container direction = "row">
                  <Grid item style = {{width: '45%', marginTop: '10px', marginLeft: '30px'}}>
                    <GetImage events = {this.props.events} category = {event.category} />
                  </Grid>
                  <Grid item container direction = "column" spacing = {2} style = {{paddingTop: '20px', paddingLeft: '10px', width: '40%'}}>
                    <Grid item>
                      <Typography>
                        場所 ：
                        <Link href = {event.event_place_url} underline = "always"　style = {{color: '#000000'}}>
                          {event.event_place}
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        期間：{event.start_date} ～ {event.end_date}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        カテゴリ：
                        <Link href = {`./?item=category&value=${event.category}&display=10&start=1`} underline = "always" style = {{color: '#000000'}}>
                          {event.category}
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }
}


export const Detailed_Contents = (props) => {
  const event = props.events.filter( event => {
      return event.event_name === props.name
  });

  if (event.length <= 0)
    document.location.href = './'

  return(
    <div>
      <Box className = "detailed" borderRadius = {10} boxShadow = {4}>
        <Box className = "detailed_name" display = "flex" borderTop = {1} borderBottom = {1} boxShadow = {2} alignItems = "center" justifyContent = "center">
          <Typography variant = "h5" >{event[0].event_name}</Typography>
        </Box>
        <Box className = "description" flexDirection="column" borderTop = {1} borderBottom = {1} display = "flex" alignItems = "left" justifyContent = "center">
          <div className = "description_dev">
            <Typography variant = "subtitle1">
              {event[0].description}
            </Typography>
          </div>
          <div className = "description_dev">
            <Typography variant = "subtitle2">
              {event[0].remarks}
            </Typography>
          </div>
        </Box>
        <Box style = {{paddingTop: '10px'}}>
          <Paper className = "detailed_table" style = {{backgroundColor: '#f0f8ff'}}>
            <Table borderRadius = {7} size = "small" style = {{marginTop: '20px'}}>
              <TableBody>
                <TableRow>
                  <TableCell style = {{width: '160px'}}>
                    <Typography>場所</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {event[0].event_place_url != '' ?
                        <Link href = {`${event[0].event_place_url}`} underline = "always">
                          {event[0].event_place}
                        </Link>
                        :event[0].event_place
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>URL</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      <Link href = {event[0].event_place_url} underline = "always">
                        {event[0].event_place_url}
                      </Link>
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>期間</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{event[0].start_date} ~ {event[0].end_date}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>住所</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      <Link href = {`https://maps.google.co.jp/maps?q=福井県福井市${event[0].address}`} underline = "always">
                        {event[0].address}
                      </Link>
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>アクセス</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{event[0].transportation}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>コンタクト</Typography>
                </TableCell>
                  <TableCell>
                    <Typography>{event[0].contact}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>電話番号</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{event[0].contact_phone_number}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>メールアドレス</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{event[0].mail_address}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>カテゴリ</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      <Link href = {`./category=${event[0].category}`}>{event[0].category}</Link>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Box>
      <Box className = "detailed" display = "flex" justifyContent="flex-end">
        <Typography>
          <Link href = "./" underline = "always" style = {{color: '#000000'}}>
            ホームに戻る
          </Link>
        </Typography>
      </Box>
    </div>
  );

}
