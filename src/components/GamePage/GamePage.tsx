import { faPlaystation, faWindows, faXbox } from "@fortawesome/free-brands-svg-icons";
import nintendo from './nintendo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Container, Icon, IconButton, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../App";
import './GamePage.styles.scss';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const buttons = [
    <Button key='cart'>
        <Container sx={{padding: '0px !important'}}> 
            <Typography variant="caption" component="div" sx={{color: 'white', opacity: '.7', paddingRight: '2px'}}>
                Add to 
            </Typography>
            cart
        </Container>
    </Button>,
    <Button key='wish' sx={{paddingRight: '0px', overflow: 'hidden',}} >
        <Container sx={{padding: '0px !important'}}> 
            <Typography variant="caption" component="div" sx={{color: 'white', opacity: '.7'}}>
                Add to 
            </Typography>
            Wishlist
        </Container>
        <ControlPointIcon sx={{marginLeft: '10px', width:'35px', height: '30px',  transform: 'translateX(10.5px) translateY(5px)'}}/>
    </Button>
];

const GamePage = () => {
    const { name, id } = useParams<{name?: string, id?: string}>();
    const [game, setGame] = useState<any>({});
    useEffect(() => {
        fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        .then(res => res.json())
        .then(
        (result) => {
            setGame(result);
        },
        (error) => {
            console.log(error);
        }
        );
    },[]);
    console.log(game);
    return (
        <>
            <Container sx={{paddingTop: '100px', paddingLeft: '300px !important', backgroundImage: `${game.background_image}`}}>
                <Typography
                variant="caption" component="div" sx={{color: 'white', opacity: '.7', marginBottom: '10px'}}>
                    HOME / GAMES / {game.name}
                </Typography>
                <Typography
                variant="subtitle2" component="div" color='secondary' sx={{fontWeight: '200px'}}
                >
                {game.released ? game.released : null}  
                </Typography>
                <Container sx={{display: 'flex', paddingLeft: '0px !important', alignItems: 'center', marginBottom: '20px'}}> 
                    {game.parent_platforms ? game.parent_platforms ?.map((platform: any) => {
                        switch(platform.platform.name) {
                            case 'PC' :
                                return <FontAwesomeIcon size="lg"  icon={faWindows} className='icon_platform' key={1}/>;
                            case 'PlayStation': 
                                return <FontAwesomeIcon size="lg"  icon={faPlaystation} className='icon_platform' key={2}/>;
                            case 'Xbox':
                                return <FontAwesomeIcon size="lg"  icon={faXbox} className='icon_platform' key={3}/>;
                            case 'Nintendo':
                                return <img src={nintendo} alt="nintendo" className='icon_platform' key={4} style={{width: '24px', height: '16px'}}/>;
                            default:
                                return null;
                        }
                    }) : null}
                    <Typography
                    variant="subtitle2" component="div" color='secondary' sx={{marginLeft: '20px'}}
                    >
                        {game.playtime ? 'AVERAGE PLAYTIME: ' + game.playtime + ' HOURS' : null}  
                    </Typography>
                </Container>
                <Typography
                variant="h2" component="h2" color='secondary' sx={{fontWeight: 'bold', marginBottom: '15px'}}
                >
                {game ? game.name : null}  
                </Typography>
                <ButtonGroup size="large" aria-label="large button group" color="secondary">
                    {buttons}
                </ButtonGroup>
                <Container sx={{display: 'flex'}}>
                    <Typography variant="h4" component="h5" color='secondary' sx={{fontWeight: 'bold'}}>
                        {game.ratings.length > 0 ? game.ratings[0].title : 'Not rated yet'}
                    </Typography>
                    <Typography variant="h4" component="h5" color='secondary' sx={{fontWeight: 'bold'}}>
                        {game.ratings.length > 0 ? game.ratings[0].title : 'Not rated yet'}
                    </Typography>
                    <Typography variant="h4" component="h5" color='secondary' sx={{fontWeight: 'bold'}}>
                        {game.ratings.length > 0 ? game.ratings[0].title : 'Not rated yet'}
                    </Typography>
                </Container>
            </Container>
        </>
    );
};

export default GamePage;