import React from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography, IconButton  } from "@mui/material";
import YouTube from "react-youtube";
import './GamesList.styles.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const GamesList = () => {
    return (
        <div className='container'>
            <Grid container spacing={1}>
                <Card sx={{ maxWidth: 385}} className='card'  >
                    <CardActionArea >
                        <CardMedia
                        component="img"
                        height="220"
                        image="https://media.rawg.io/media/movies/d8a/d8a61a3a12e52114afdbc28f2c813f5c.jpg"
                        alt="green iguana"
                        />
                        <CardContent className='card card__content' >
                        <Typography gutterBottom variant="h6" component="div">
                            Vampire: The Masquerade - Bloodlines 2
                        </Typography>
                        
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{paddingLeft: '24px'}}>
                        <IconButton> 
                            <FavoriteBorderIcon className='icon'/>
                        </IconButton>
                        <IconButton> 
                            <AddShoppingCartIcon className='icon'/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        </div>
        
      );
      
};

export default GamesList;