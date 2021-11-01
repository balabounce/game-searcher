import React, { useEffect, useState } from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography, IconButton, Stack, Pagination  } from "@mui/material";
import './GamesList.styles.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows, faPlaystation, faXbox, faApple, faLinux } from "@fortawesome/free-brands-svg-icons";

interface GamesListProps {
    titleGamesList: string,
    getAllGames?: (page: number, setGames:  React.Dispatch<React.SetStateAction<never[]>>) => void;
}


const GamesList: React.FC<GamesListProps> = ({titleGamesList, getAllGames}) => {
    const [page, setPage] = useState(1);
    const [games, setGames] = useState([]);
    useEffect(() => {
        const result = getAllGames ? getAllGames(page, setGames) : null;
    }, [page]);

    console.log(games);
  
    return (
        <Container className='gameslist-container'>
            <Typography sx={{paddingLeft: '5px', color: 'white', marginBottom:'10px'}}  variant="h3" component="h3"> {titleGamesList} </Typography>
            <Grid container spacing={1} sx={{width: 'calc(140% + 8px)'}}>
                {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    games.map((game: any) => {
                        return (
                            <Card sx={{ width: '350px', height: 'fit-content'}} className='card'  key={game.id}>
                                <CardActionArea key={game.id+1} >
                                    <CardMedia
                                    component="img"
                                    height="220"
                                    image={game.background_image}
                                    alt={`${game.name}_poster`}
                                    key={game.id}
                                    sx={{objectFit: 'cover'}}
                                    />
                                    <CardContent className='card card__content' key={game.id+2}>
                                        {game.parent_platforms.map((platform: any) => {
                                            // console.log(platform.platform);
                                            switch(platform.platform.name) {
                                                case 'PC' :
                                                    return <FontAwesomeIcon size="lg"  icon={faWindows} className='icon_platform' key={1}/>;
                                                case 'PlayStation': 
                                                    return <FontAwesomeIcon size="lg"  icon={faPlaystation} className='icon_platform' key={2}/>;
                                                case 'Xbox':
                                                    return <FontAwesomeIcon size="lg"  icon={faXbox} className='icon_platform' key={3}/>;
                                                default:
                                                    return null;
                                            }
                                        })}
                                        {/* 
                                        <FontAwesomeIcon size="lg"  icon={faApple} className='icon_platform'/>
                                        <FontAwesomeIcon size="lg"  icon={faLinux} className='icon_platform'/> */}
                                        <Typography gutterBottom variant="h6" component="div" sx={{minHeight: '64px'}} key={game.id+3}>
                                            {game.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions sx={{paddingLeft: '10px'}} key={game.id+4}>
                                    <IconButton> 
                                        <FavoriteBorderIcon className='icon_button'/>
                                    </IconButton>
                                    <IconButton> 
                                        <AddShoppingCartIcon className='icon_button'/>
                                    </IconButton>
                                </CardActions>
                            </Card> 
                        );
                    })
                }
            </Grid>
            <Stack spacing={2} className='pagination'>
                <Pagination count={3} shape="rounded" color='primary' sx={{color:'white'}} onClick={(event) => 
                       (console.log(document.querySelector('.Mui-selected')?.textContent))
                }/>
            </Stack>
        </Container>
      );
      
};

export default GamesList;