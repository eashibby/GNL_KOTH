import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Grid2, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Koth = () => {
  const [lower_signups, setLowerSignups] = useState([]);
  const [mid_signups, setMidSignups] = useState([]);
  const [high_signups, setHighSignups] = useState([]);

  useEffect(()=>{
    fetch("http://127.0.0.1:3000/get_bucket/1").then((response) => response.json()).then((json) => setLowerSignups(json))
    fetch("http://127.0.0.1:3000/get_bucket/2").then((response) => response.json()).then((json) => setMidSignups(json))
    fetch("http://127.0.0.1:3000/get_bucket/3").then((response) => response.json()).then((json) => setHighSignups(json))
  },[])

  const [addPlayerName, setAddPlayerName] = useState('');
  const [addPlayerRace, setAddPlayerRace] = useState('');
 
  const handleRemoveItem = (name, race, bucket) => {
    console.log("handleRemoveItem", name, race);
  fetch('http://127.0.0.1:3000/remove_signup/' + encodeURIComponent(name) + '/' + race)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json()       
      }).then((response) => {
        fetch("http://127.0.0.1:3000/get_bucket/" + bucket).then((response) => response.json()).then((json) => {
          if(bucket === 1){
            setLowerSignups(json)
          }else if (bucket === 2){
            setMidSignups(json)
          }else {
            setHighSignups(json)
          }
        } )
      }).catch((error) => {
        console.log("catch")
        console.log(error)
      });
  };

  const addPlayerFunct =() => {
    console.log( 'addPlayerName:', addPlayerName, 'addPlayerRace:', addPlayerRace);
  fetch('http://127.0.0.1:3000/signup/' + encodeURIComponent(addPlayerName) + '/' + addPlayerRace)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json()       
      }).then((player) => {
        fetch("http://127.0.0.1:3000/get_bucket/" + player['bucket']).then((response) => response.json()).then((json) => {
          if(player['bucket'] === 1){
            setLowerSignups(json)
          }else if (player['bucket'] === 2){
            setMidSignups(json)
          }else {
            setHighSignups(json)
          }
        })
      }).catch((error) => {
        console.log("catch")
        console.log(error)
      });
  }

  return (
    <Box sx={{ p: 5 }}>
       <Grid2 container spacing={3}>
        <Grid2 item size={2}>
          <TextField value={addPlayerName} onInput={ e=>setAddPlayerName(e.target.value)} />
        </Grid2>
        <Grid2 item size={2}>
          <TextField value={addPlayerRace} onInput={ e=>setAddPlayerRace(e.target.value)} />
        </Grid2>
        <Grid2 item size={2} margin="auto" >
            <Button variant="contained" size="large" onClick={()=> addPlayerFunct()}>Add Player</Button>
        </Grid2>
        <Grid2 item size={6} >
        </Grid2>
      </Grid2>
      <Box sx={{ p: 5 }}></Box>
      <Grid2 container spacing={3}>
        <Grid2 item size={4}>
        <Item>
          <Typography variant="h6">Lower Bracket 0-1450</Typography>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {lower_signups.map((player) => (
            <ListItem
            name={player['id']}
            key={player['id']}
              disableGutters
              secondaryAction={
                <IconButton aria-label="comment" onClick={() => handleRemoveItem(player['battleTag'], player['race'],player['bucket'])}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={`${player['name']} - ${player['race']}(${player['mmr']})`} />
            </ListItem>
          ))}
        </List>
        </Item>
         </Grid2>
        <Grid2 item size={4}>
          <Item>
            <Typography variant="h6">Middle Bracket 1450-1600</Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {mid_signups.map((player) => (
              <ListItem
              name={player['id']}
              key={player['id']}
                disableGutters
                secondaryAction={
                  <IconButton aria-label="comment" onClick={() => handleRemoveItem(player['battleTag'], player['race'],player['bucket'])}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={`${player['name']} - ${player['race']}(${player['mmr']})`} />
              </ListItem>
            ))}
            </List>
          </Item>
          </Grid2>
        <Grid2 item size={4}>
          <Item>
            <Typography variant="h6">Higher Bracket 1600-to the moon</Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {high_signups.map((player) => (
              <ListItem
              name={player['id']}
              key={player['id']}
                disableGutters
                secondaryAction={
                  <IconButton aria-label="comment" onClick={() => handleRemoveItem(player['battleTag'], player['race'],player['bucket'])}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={`${player['name']} - ${player['race']}(${player['mmr']})`} />
              </ListItem>
            ))}
            </List>
          </Item>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default Koth