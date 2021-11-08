/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, IconButton, Stack, Pagination, Link, Grid  } from "@mui/material";
import './GamesList.styles.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows, faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";
import LazyLoad from 'react-lazyload';
// import { useTheme } from '@mui/styles';

interface GamesListProps {
    titleGamesList: string,
    getGames?: (page: number, setGames: React.Dispatch<React.SetStateAction<never[]>>, setCount: React.Dispatch<React.SetStateAction<number>>) => void;
}


const GamesList: React.FC<GamesListProps> = ({titleGamesList, getGames}) => {
    const [page, setPage] = useState(1);
    const [games, setGames] = useState([]);
    const [countGames, setCount] = useState(0);

    useEffect(() => {
        getGames ? getGames(page, setGames, setCount) : null;
    }, [page]);
    // const theme = useTheme();

    return (
        <div className='gameslist-container'>
            <Typography sx={{paddingLeft: '5px', color: 'white', marginBottom:'10px', width: 'fit-content'}}  variant="h3" component="h3"> {titleGamesList} </Typography>
            <Grid container spacing={1}>
                {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    games.map((game: any) => {
                        return (
                            <Card sx={{ width: '382px', height: 'fit-content'}} className='card'  key={game.id}>
                                    <CardActionArea key={game.id+1} >
                                        <Link href={`/games/${game.id}/${game.name.replace(/ /g, '-').replace(/\/|:|/g, '').replace(/--+/g,'-').toLowerCase()}`}>
                                            <LazyLoad height={200}>
                                                <CardMedia
                                                component="img"
                                                height="220"
                                                image={game.background_image}
                                                alt={`${game.name}_poster`}
                                                key={game.id}
                                                />
                                            </LazyLoad>
                                            <CardContent className='card card__content' key={game.id+2}>
                                                {game.parent_platforms ? game.parent_platforms.map((platform: any) => {
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
                                                }) : null}
                                                {/* 
                                                <FontAwesomeIcon size="lg"  icon={faApple} className='icon_platform'/>
                                                <FontAwesomeIcon size="lg"  icon={faLinux} className='icon_platform'/> */}
                                                <Typography gutterBottom variant="h6" component="div" sx={{minHeight: '32px'}} key={game.id+3}>
                                                    {game.name}
                                                </Typography>
                                            </CardContent>
                                        </Link>
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
                {titleGamesList === 'Top 100' ? 
                    <Pagination count={5} shape="rounded" color='primary' sx={{color:'white'}} onClick={() => 
                        setTimeout(() => {
                            const pageNum = document?.querySelector('.Mui-selected')?.textContent;
                            if(pageNum) {
                                setPage(+pageNum);
                            }
                        }, 0)
                    }/>
                :
                countGames ? 
                    <Pagination count={countGames} shape="rounded" color='primary' sx={{color:'white'}} onClick={() => 
                        setTimeout(() => {
                            const pageNum = document?.querySelector('.Mui-selected')?.textContent;
                            if(pageNum) {
                                setPage(+pageNum);
                            }
                        }, 0)
                    }/>
                : null}
            </Stack>
        </div>
      );
      
};

export default GamesList;