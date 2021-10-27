import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAuth0 } from '@auth0/auth0-react';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'; 
import StarIcon from '@mui/icons-material/Star';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { Link } from '@mui/material';

const drawerWidth = 240;

const SideBar: React.FC = () => {
	const { user, isAuthenticated } = useAuth0();
	const minW = '42px';

	const renderSwitchIcon = (section: string, i: number): JSX.Element => {
		if(section === 'newrelease'){
			switch(i) {
				case 0:
					return <StarIcon color='secondary' sx={{minWidth: minW}}/>;
				case 1:
					return <WhatshotIcon  color='secondary' sx={{minWidth:minW}}/>;
				case 2: 
					return <FastRewindIcon  color='secondary' sx={{transform: 'rotate(180deg)', minWidth:minW}}/>;
				case 3:
					return <CalendarTodayIcon  color='secondary' sx={{minWidth:minW}}/>;
			}
		} else if(section === 'top') {
			switch(i) {
				case 0:
					return <EmojiEventsIcon  color='secondary' sx={{minWidth:minW}}/>;
				case 1:
					return <EqualizerIcon  color='secondary' sx={{minWidth:minW}}/>;
				case 2: 
					return <LocalActivityIcon  color='secondary' sx={{minWidth:minW}}/>;
			}
		}
		return <></>;
	};

  return (
  <Box sx={{ display: 'flex'}}>
      <Drawer
        sx={{
			width: drawerWidth,
			flexShrink: 0,
			'& .MuiDrawer-paper': {
				width: drawerWidth,
				boxSizing: 'border-box',
				backgroundColor: 'rgb(5, 52, 66)',
				color: '#fff',
				border: 'none',
				overflow: 'hidden'
			},
			zIndex: 1000,
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
		<Link href={window.location.origin} underline="none">
        <Typography ml={2} mt={1} variant="h4" component="h3" sx={{
			transition: 'color .5s',
			'&:hover': {
				color: 'white'
			}
		}}>
          Home
        </Typography>
		</Link>

		{isAuthenticated ?  
			<>
				<Typography ml={2} mt={1} variant="h5" component="h3">
					{user?.name}
				</Typography>
				<List>
					{['Cart', 'Wishlist'].map((text, index) => (
						<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <ShoppingBasketIcon  color='secondary' sx={{minWidth:minW}}/> : <CardGiftcardIcon  color='secondary' sx={{minWidth:minW}}/>}
						</ListItemIcon>
						<ListItemText primary={text} />
						</ListItem>
					))}
				</List> 
			</>
			: null
		}

		
        <Typography ml={2} mt={1} variant="h5" component="h3">
          New Releases
        </Typography>

        <List>
          {['Last 30 days', 'This week', 'Next week', 'Release calendar'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {
					renderSwitchIcon('newrelease', index)
				} 
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>


		<Typography ml={2} mt={1} variant="h5" component="h3">
          Top
        </Typography>
		
        <List>
          {['Best of the year', 'Popular in 2021', 'All time top 250'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {
					renderSwitchIcon('top', index)
				}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;