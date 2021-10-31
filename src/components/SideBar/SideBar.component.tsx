import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
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
import userLocalCheck from '../../functions/userLocalCheck';
import './SideBar.styles.scss';
import { Router } from 'react-router';


const drawerWidth = 240;

const SideBar: React.FC = () => {
	const minW = '42px';
	const user = userLocalCheck();
	// const {user, isAuthenticated, isLoading} = useAuth0();
	const renderSwitchIcon = (section: string, i: number): JSX.Element => {
		if(section === 'newrelease'){
			switch(i) {
				case 0:
					return <StarIcon color='secondary' sx={{minWidth: minW}} className='icon'/>;
				case 1:
					return <WhatshotIcon  color='secondary' sx={{minWidth:minW}} className='icon'/>;
				case 2: 
					return <FastRewindIcon  color='secondary' sx={{transform: 'rotate(180deg)', minWidth:minW}} className='icon'/>;
				case 3:
					return <CalendarTodayIcon  color='secondary' sx={{minWidth:minW}} className='icon'/>;
			}
		} else if(section === 'top') {
			switch(i) {
				case 0:
					return <EmojiEventsIcon  color='secondary' sx={{minWidth:minW}} className='icon'/>;
				case 1:
					return <EqualizerIcon  color='secondary' sx={{minWidth:minW}} className='icon'/>;
				case 2: 
					return <LocalActivityIcon  color='secondary' sx={{minWidth:minW}} className='icon'/>;
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
				overflow: 'hidden',
				paddingLeft: '20px',
				paddingTop: '40px'
			},
			zIndex: 1000,
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
		<Link href={window.location.origin} underline="none">
        <Typography ml={2} mt={1} mb={2} variant="h5" component="h3" sx={{
			transition: 'filter .3s',
			color: 'white',
			'&:hover': {
				filter: 'brightness(50%)'
			}
		}}>
          Home
        </Typography>
		</Link>

		{user ?  
			<>
				<Typography ml={2} mt={1} variant="h5" component="h3">
					{user?.name}
				</Typography>
				<List>
					{['Cart', 'Wishlist'].map((text, index) => (
						<Link href={`/discover/${text.toLowerCase().replace(/ /g, '-')}`} color='secondary' sx={{textDecoration: 'none'}} key={index}>
							<ListItem button key={text} className='listitem'>
								<ListItemIcon>
									{index % 2 === 0 ? <ShoppingBasketIcon className='icon'  color='secondary' sx={{minWidth:minW}}/> : <CardGiftcardIcon className='icon'  color='secondary' sx={{minWidth:minW}}/>}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						</Link>
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
				<Link 
					href={`/discover/${text.toLowerCase().replace(/ /g, '-')}`} 
					color='secondary' 
					sx={{textDecoration: 'none'}} 
					key={index}
					>
					<ListItem button key={text} className='listitem'>
						<ListItemIcon>
							{
								renderSwitchIcon('newrelease', index)
							} 
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				</Link>
          ))}
        </List>


		<Typography ml={2} mt={1} variant="h5" component="h3">
          Top
        </Typography>
		
        <List>
          {['Best of the year', 'Popular in 2021', 'All time top 250'].map((text, index) => (
			<Link href={`/discover/${text.toLowerCase().replace(/ /g, '-')}`} color='secondary' sx={{textDecoration: 'none'}} key={index}>
				<ListItem button key={text} className='listitem'>
					<ListItemIcon>
						{
							renderSwitchIcon('top', index)
						}
					</ListItemIcon>
					<ListItemText primary={text} />
				</ListItem>
			</Link>

          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
