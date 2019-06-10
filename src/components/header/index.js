import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import Button from'@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

export default function Header() {
  return(
    <div>
      <AppBar className = "appbar" position = "static" style = {{backgroundColor: '#faebd7'}}>
        <ToolBar>
          <Typography variant = "h5">
            <Link href = "./" underline = "none" style = {{color: '#696969'}}>
              ふくいのイベント
            </Link>
          </Typography>
        </ToolBar>
      </AppBar>
  </div>
  )
}

export const Sub_Header = () => {
  return(
    <Box style = {{padding: '10px'}}>
      <Typography variant = "h6">
        福井県のイベント情報サイトです。
      </Typography>
    </Box>
  );
}
