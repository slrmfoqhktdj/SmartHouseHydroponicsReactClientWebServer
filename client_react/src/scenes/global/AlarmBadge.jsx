import React from 'react';
import { Box, IconButton} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useState ,useCallback, useEffect  } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {fetchGet} from '../../communication/handlefetch'
import Badge from '@mui/material/Badge';


function AlarmBadge(){

  const [Data, setData] = useState([]);
  const [DataCount, setDataCount] = useState(0);

  const [anchorElAlarm, setAnchorElAlarm] = useState(null);
  const openAlarm = Boolean(anchorElAlarm);

  const openAlarmPositionMenu = (event) => {
    setAnchorElAlarm(event.currentTarget);
  };
  const closeAlarmPositionMenu = () => {
    setAnchorElAlarm(null);
  };

  const clickAlarmItem = (index) =>{
    const newData = [...Data]
    const newItem = newData[index]
    if(newItem.read === false){
      newItem.read = true
      newData[index] = newItem
      setData(newData)
      setDataCount(DataCount-1)
    }
  }


  const getAlarmData = useCallback(async () => {
    
    fetchGet(`/alarmlist`)
    .then((data) => {        
      var count = 0;

      data?.items.forEach((item) => {
        if(item.read === false){
          count = count + 1
        }
      })

      setData(data?.items)
      setDataCount(count)

    }).catch((err)=>{});
  },[])

  

  useEffect(() => {
    getAlarmData()
  }, [getAlarmData]);


  return (
    <Box display="flex">

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorElAlarm}
        open={openAlarm}
        onClose={closeAlarmPositionMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      > 
        {
          Data?.map((item, index) => {
            return <MenuItem key={item.time} onClick={()=> {closeAlarmPositionMenu(); clickAlarmItem(index);}} sx={{backgroundColor: item.read? null :"black"}}> {item.title} -- {item.id} -- {item.time} </MenuItem>
          })
        }
      </Menu>




      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={(event)=> openAlarmPositionMenu(event)}>
          <Badge badgeContent={DataCount} color="warning">
            <NotificationsOutlinedIcon />
          </Badge>
          
        </IconButton>
      </Box>
    </Box>
  );
};

export default React.memo(AlarmBadge);
