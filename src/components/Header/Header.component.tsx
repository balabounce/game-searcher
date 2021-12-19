import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar } from '@mui/material';
import userLocalCheck from '../../functions/userLocalCheck';
import searchGame from '../../api/searchGames';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.65),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
  width: '100%',
  color: 'black',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '80%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '150%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));

const PrimarySearchAppBar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const [foundGames, setFoundgames] = React.useState<any[]>([]);

    React.useEffect(() => {
        console.log(foundGames);
    }, [foundGames]);

    // const { user, isAuthenticated, isLoading} = useAuth0();
      const user =  userLocalCheck();
    const { loginWithRedirect, logout } = useAuth0();

    // if(isAuthenticated) console.log(user);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };

    const menuItemArr = [ <MenuItem onClick={handleMenuClose} key={1}>Profile</MenuItem>,
      <MenuItem onClick={() => {
      localStorage.removeItem('user');
      logout({ returnTo: window.location.origin });
    }} key={2}>Logout</MenuItem>];


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{marginTop:'60px'}}
      >
          {user ?
            menuItemArr.map(menuItem => {
              return menuItem;
            })
          : <MenuItem onClick={loginWithRedirect}>Login</MenuItem>}
      </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
          {
            user ? <Avatar alt="User" src={user?.picture}/>  : <AccountCircle /> 
          }
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ boxShadow:"none", paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px'}}>
          <Toolbar  className='toolbar' sx={{paddingLeft: '20px !important'}}>
            <Typography
              variant="h6"
              noWrap
              component="h1"
              sx={{ display: { xs: 'none', sm: 'block' }, fontFamily: 'Zen Tokyo Zoo', }}
            >
              G.S.
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search games…"
                inputProps={{ 'aria-label': 'search' }}
                fullWidth={true}
                onChange={async (e) => {
                        e.target.value.length > 0 ? searchGame(e.target.value).then((res) => setFoundgames(res)) : setFoundgames([]);
                    }
                }
              />
              <List component='nav' sx={{position: 'absolute', backgroundColor: 'white', width:'100%', padding: '0px'}}>
                {foundGames ? foundGames.map((game, i) => {
                    if(i < 5) {
                        return (
                            <Link href={`/games/${game.id}/${game.name.replace(/ /g, '-').replace(/\/|:|/g, '').replace(/--+/g,'-').toLowerCase()}`} sx={{textDecoration: 'none'}}> 
                               <ListItemButton sx={{display: 'flex', justifyContent: 'space-between', height: 'fit-content', maxHeight: '50vh'}} >
                                    <ListItemIcon sx={{height: '47px', width: '36px', marginRight: '20px'}}>
                                        <img src={game.image} style={{height: '100%', width: '100%'}}/>
                                    </ListItemIcon>
                                    <ListItemText primary={game.name} sx={{width: 'fit-content'}}/>
                               </ListItemButton>
                             </Link>
                        );
                    } else return null;
        }) : null} 
                </List>
            </Search>
            <Box sx={{ flexGrow: 1 }} />
              <Typography
                  variant="h6"
                  noWrap
                  component="h2"
                  sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '18px', marginRight: '10px' }}
              >
                  {user ?  `${user.name}` : 'Hello, anon :3'}
              </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                  {
                      user ? <Avatar alt="UserPic" src={user?.picture}/>  : <AccountCircle /> 
                  }            
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {/* {renderMobileMenu} */}
        {renderMenu}
      </Box>
    );
};

export default PrimarySearchAppBar;
