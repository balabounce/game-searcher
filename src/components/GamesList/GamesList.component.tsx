import React, { useState } from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography, IconButton  } from "@mui/material";
import YouTube from "react-youtube";
import './GamesList.styles.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows, faPlaystation, faXbox, faApple, faLinux } from "@fortawesome/free-brands-svg-icons";

interface GamesListProps {
    titleGamesList: string,
    getAllGames?: (pageNum: number, arr: []) => void;
}

const GamesList: React.FC<GamesListProps> = ({titleGamesList, getAllGames}) => {
    const [page, setPage] = useState(1);
    const [games, setGames] = useState([]);
    const result = getAllGames ? getAllGames(page, setGames) : null;


    return (
        <Container className='gameslist-container'>
            <Typography sx={{paddingLeft: '5px', color: 'white', marginBottom:'10px'}}  variant="h3" component="h3"> {titleGamesList} </Typography>
            <Grid container spacing={1}>
                <Card sx={{ maxWidth: 385}} className='card'  >
                    <CardActionArea >
                        <CardMedia
                        component="img"
                        height="220"
                        image="https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg"
                        alt="green iguana"
                        />
                        <CardContent className='card card__content' >
                            <FontAwesomeIcon size="lg"  icon={faWindows} className='icon_platform'/>
                            <FontAwesomeIcon size="lg"  icon={faPlaystation} className='icon_platform'/>
                            <FontAwesomeIcon size="lg"  icon={faXbox} className='icon_platform'/>
                            <FontAwesomeIcon size="lg"  icon={faApple} className='icon_platform'/>
                            <FontAwesomeIcon size="lg"  icon={faLinux} className='icon_platform'/>
                            <Typography gutterBottom variant="h6" component="div">
                                Vampire: The Masquerade - Bloodlines 2
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{paddingLeft: '10px'}}>
                        <IconButton> 
                            <FavoriteBorderIcon className='icon_button'/>
                        </IconButton>
                        <IconButton> 
                            <AddShoppingCartIcon className='icon_button'/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        </Container>
        
      );
      
};

export default GamesList;