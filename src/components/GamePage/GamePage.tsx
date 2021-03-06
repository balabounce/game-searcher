import { faApple, faAppStore, faPlaystation, faSteam, faWindows, faXbox } from "@fortawesome/free-brands-svg-icons";
import nintendo from './nintendo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Container, Grid, Icon, IconButton, ImageList, ImageListItem, Link, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../App";
import './GamePage.styles.scss';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddCommentIcon from '@mui/icons-material/AddComment';
import GamesList from "../GamesList/GamesList.component";
import YouTube from "react-youtube";
import gog from './gog.svg';
import epicGames from './epic-games.svg';
import nintendoStore from './nintendo-switch.png';
import { IPlatform, IScreen, IStoreObj } from "./interfaces";
import { Slider } from "../Slider/Slider.component";
import SwitchStore  from "./SwitchStore.component";
import InfoGrid from "./InfoGrid.component";
import { formReleaseDate } from "../../functions/formDate";

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


const getUrl = (screens: IScreen[] | undefined) => {
    const screenArr: string[]  = [];
    screens?.map(screen => {
        screenArr.push(screen.image);
    });  
    return screenArr;
};

const sliderClose = (event: React.MouseEvent<HTMLElement, MouseEvent>, hook: React.Dispatch<React.SetStateAction<boolean>>) => {
    const target = event.target as HTMLElement;
    if(target.classList.contains('slider_container') || target.classList.contains('icon_close') || target.closest('svg')) {
        hook(false);
    }
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
    const [flagDescrOpen, flagDescrSwitch] = useState(false);
    const [screenGame, setScreenGame] = useState<IScreen[]|undefined>([]);
    const [screenGameUrl, setUrls] = useState<string[]>([]);
    const [flagSliderOpen, sliderSwitch] = useState<boolean>(false);

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
        )
        .then(() => {
            fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setScreenGame(result.results);
                    console.log(result.results);
                },
            (error) => {
                console.log(error);
            }
        );
        })
        ;
        
    },[]);
    useEffect(() => {
        const res = getUrl(screenGame);
        setUrls(res);
    }, [screenGame]);
    useEffect(() => {
        const sliderElement = document.querySelector('.slider_container');
        if(sliderElement) {
            if(flagSliderOpen) {
                sliderElement.classList.remove('slider_container_close');
            } else {
                sliderElement.classList.add('slider_container_close');
            }
        }
    }, [flagSliderOpen]);

    // console.log(game);

    return (
        <section className='game_section' onClick={(event) => flagSliderOpen ? sliderClose(event, sliderSwitch) : null}>
            {screenGameUrl && flagSliderOpen ? <Slider screens={screenGameUrl}/> : null}
            <Container sx={{paddingTop: '100px', paddingLeft: '300px !important', backgroundImage: `${game.background_image}`}}>
                <Typography
                variant="caption" component="div" sx={{color: 'white', opacity: '.7', marginBottom: '15px'}}>
                    HOME / GAMES / {game.name}
                </Typography>
                <Container sx={{display: 'flex', paddingLeft: '0px !important', alignItems: 'center', marginBottom: '15px'}}> 
                    {game.released ?
                    <Typography
                        variant="subtitle2" component="div" color='primary' sx={{fontWeight: '200px', 
                        marginRight: '10px',
                        backgroundColor: 'white', 
                        width: 'fit-content',
                        borderRadius: '4px',
                        padding: '0px 2px'
                        }}
                    >
                        {formReleaseDate(game.released) }
                    </Typography>
                    : null}  
                    {game.parent_platforms ? game.parent_platforms ?.map((platform: IPlatform) => {
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
                        onClick={() => {flagDescrSwitch(!flagDescrOpen);}}
                        size='small' 
                        color='primary' 
                        className='read_more_btn'
                        sx={{backgroundColor: 'white', padding: '1px', fontSize: '10px', borderRadius: '0px'
                        }}>
                            Read more
                        </Button>
                    </Typography>
                </Container>
                <InfoGrid game={game}/>
            </Container>
            <Container> 
                <Grid container rowSpacing={1} columnSpacing={1} ml={0} mt={11} className='grid_container_vidscr' >
                    <Grid item xs={8} className='grid_item_video' >
                        {game && game.clip ? <YouTube videoId={game.clip.video}/> : null}
                    </Grid>
                    {
                        screenGameUrl.map((url, index) => 
                                {
                                if(index < 3) {
                                    return <Grid item className='grid_item_img' xs={5} sx={{width: '105px', height: '185px'}} key={index} >
                                        <img src={url} className='screen_image'/>
                                    </Grid>;
                                } else {
                                    return null;
                                }
                            }
                        )
                    }
                    {screenGame && screenGame.length > 0 &&
                        <Grid item className='grid_item_img' xs={5} sx={{width: '105px', height: '185px'}} key={3} >
                            <Button variant="contained" className='screen_btn' onClick={() => sliderSwitch(!flagSliderOpen)}>
                                <img src={screenGameUrl[2]} className='screen_image screen_image_btn'/>
                                <Typography variant="body1" className='view_all' component="span" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                                View all
                                </Typography>
                            </Button>  
                        </Grid>
                    }
                     <Grid item xs={12} mt={1} mb={5} className='grid_item_whereToBuy' >
                        <Typography variant="h5" className='view_all' component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                            Where To Buy
                        </Typography>
                    </Grid>
                    {game && game.stores && game.stores.map((item: IStoreObj) => <SwitchStore name={item.store.name} url={item.url}/>)}
                </Grid>
            </Container>
        </section>
    );
};

export default GamePage;
