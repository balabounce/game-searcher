import { faPlaystation, faWindows, faXbox } from "@fortawesome/free-brands-svg-icons";
import nintendo from './nintendo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Container, Grid, Icon, IconButton, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../App";
import './GamePage.styles.scss';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddCommentIcon from '@mui/icons-material/AddComment';
import GamesList from "../GamesList/GamesList.component";

const ratingText = (rate: string) => {
    return rate[0].toUpperCase() + rate.slice(1);
};

const ratingIcon = (rate: string) => {
    switch(rate) {
        case 'exceptional' :
            return <EmojiEmotionsIcon className='icon_sentiment icon_sentiment_good'/>;
        case 'recommended' :
            return <InsertEmoticonIcon className='icon_sentiment icon_sentiment_rec'/>;
        case 'meh' :
            return <SentimentDissatisfiedIcon className='icon_sentiment icon_sentiment_bad'/>;
        case 'skip' :
            return <SentimentVeryDissatisfiedIcon className='icon_sentiment icon_sentiment_awful'/>;
        default:
            return null;
    }
};

const formReleaseDate = (date: string) => {
    const month = +date.slice(5,7) - 1;
    const year = date.slice(0,4);
    const day = date.slice(8, 10);
    const monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Novr", "Dec"
    ];
    const result =  `${monthNames[month].toUpperCase()} ${day}, ${year}`;
    return <Typography
        variant="subtitle2" component="div" color='primary' sx={{fontWeight: '200px', 
        marginRight: '10px',
        backgroundColor: 'white', 
        width: 'fit-content',
        borderRadius: '4px',
        padding: '0px 2px'
        }}
        >
            {result}
        </Typography>;
    
};

const writePlatforms = (platArr: any[]) => {
    const result: string|null[] = [];
    platArr.map(platform => {
        const platName = platform.platform.name;
        result.push(platName);
    });

    return result.join(', ');
};


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
    const [fullDescr, setFullDescr] = useState<string|null>(null);
    const [flagDescrOpen, setFlagDescrOpen] = useState(false);
    
    useEffect(() => {
        fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        .then(res => res.json())
        .then(
            (result) => {
                setGame(result);
                setFullDescr(result.description_raw);
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
                variant="caption" component="div" sx={{color: 'white', opacity: '.7', marginBottom: '15px'}}>
                    HOME / GAMES / {game.name}
                </Typography>
                <Container sx={{display: 'flex', paddingLeft: '0px !important', alignItems: 'center', marginBottom: '15px'}}> 
                    {game.released ? formReleaseDate(game.released) : null}  
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
                <ButtonGroup size="large" aria-label="large button group" color="secondary" sx={{marginBottom: '15px'}}>
                    {buttons}
                </ButtonGroup>
                <Container sx={{padding: '0px !important', 
                    display: 'flex', 
                    alignItems: 'center', 
                    borderRight: '1px solid grey', 
                    width: 'fit-content', 
                    marginLeft: '0px',
                    marginBottom: '15px'}}>
                    <Typography variant="h5" component="h5" color='secondary' sx={{fontWeight: 'bold', marginRight: '5px'}}>
                        {game && game.ratings && game.ratings.length > 0 ? ratingText(game.ratings[0].title): 'Not rated yet'}
                    </Typography>
                    {game && game.ratings && game.ratings.length > 0 ? ratingIcon(game.ratings[0].title) : null}
                </Container>
                <Button size='large' variant="contained" color='secondary' disableElevation sx={{marginBottom: '15px'}}>
                    <AddCommentIcon sx={{marginRight: '5px'}}/>
                    Add a comment
                </Button>
                <Container sx={{padding: '0px !important', width: '550px !important', margin: '0px', marginBottom: '15px'}}>
                    <Typography variant="h5" component="h5" color='secondary' sx={{fontWeight: 'bold', marginRight: '5px', marginBottom:'5px'}}>
                        About
                    </Typography>
                    <Typography variant="body1" gutterBottom color='secondary'>
                        {fullDescr &&
                        fullDescr.length > 350 && !flagDescrOpen ? `${fullDescr?.slice(0,350)}...` 
                        : flagDescrOpen || (fullDescr && fullDescr?.length < 350) ? fullDescr
                        : null}
                        <Button
                        onClick={() => {setFlagDescrOpen(!flagDescrOpen);}}
                        size='small' 
                        color='primary' 
                        sx={{backgroundColor: 'white', padding: '1px', fontSize: '10px', borderRadius: '0px'
                        }}>
                            Read more
                        </Button>
                    </Typography>
                </Container>
                <Grid container spacing={2} ml={0}>
                    <Grid item xs={4} sx={{paddingLeft: '0px !important'}}>
                        <Container sx={{padding: '0px !important', marginBottom: '10px'}}>
                            <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                                Platforms
                            </Typography>
                            <Typography variant="body1" component="span" color='secondary' sx={{marginRight: '5px', marginBottom:'5px', textDecoration: 'underline'}}>
                                {game && game.platforms ? writePlatforms(game.platforms) : null}
                            </Typography>
                        </Container>
                    </Grid>
                    <Grid item xs={6} sx={{paddingLeft: '0px !important'}}>
                        <Container sx={{padding: '0px !important', marginBottom: '10px'}}>
                            <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                                Genre
                            </Typography>
                            <Typography variant="body1" component="span" color='secondary' sx={{marginRight: '5px', marginBottom:'5px', textDecoration: 'underline'}}>
                                Platforms
                            </Typography>
                        </Container>
                    </Grid>
                    <Grid item xs={4} sx={{paddingLeft: '0px !important'}}>
                        <Container sx={{padding: '0px !important', marginBottom: '10px'}}>
                            <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                                Release Date
                            </Typography>
                            <Typography variant="body1" component="span" color='secondary' sx={{marginRight: '5px', marginBottom:'5px', textDecoration: 'underline'}}>
                                Platforms
                            </Typography>
                        </Container>
                    </Grid>
                    <Grid item xs={6} sx={{paddingLeft: '0px !important'}}>
                        <Container sx={{padding: '0px !important', marginBottom: '10px'}}>
                            <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                                Developer
                            </Typography>
                            <Typography variant="body1" component="span" color='secondary' sx={{marginRight: '5px', marginBottom:'5px', textDecoration: 'underline'}}>
                                Platforms
                            </Typography>
                        </Container>
                    </Grid>   
                    <Grid item xs={4} sx={{paddingLeft: '0px !important'}}>
                        <Container sx={{padding: '0px !important', marginBottom: '10px'}}>
                            <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                                Publisher
                            </Typography>
                            <Typography variant="body1" component="span" color='secondary' sx={{marginRight: '5px', marginBottom:'5px', textDecoration: 'underline'}}>
                                Platforms
                            </Typography>
                        </Container>
                    </Grid>  
                    <Grid item xs={6} sx={{paddingLeft: '0px !important'}}>
                        <Container sx={{padding: '0px !important', marginBottom: '10px'}}>
                            <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                                Age rating
                            </Typography>
                            <Typography variant="body1" component="span" color='secondary' sx={{marginRight: '5px', marginBottom:'5px', textDecoration: 'underline'}}>
                                Platforms
                            </Typography>
                        </Container>
                    </Grid>                       
                </Grid>
            </Container>
        </>
    );
};

export default GamePage;