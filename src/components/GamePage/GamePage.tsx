import { faPlaystation, faWindows, faXbox } from "@fortawesome/free-brands-svg-icons";
import nintendo from './nintendo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../App";
import './GamePage.styles.scss';

const GamePage = () => {
    const { name, id } = useParams<{name?: string, id?: string}>();
    const [game, setGame] = useState<any>({});
    useEffect(() => {
        fetch(`https://api.rawg.io/api/games/${name}?key=${API_KEY}`)
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
        <Container sx={{paddingTop: '100px', paddingLeft: '300px !important'}}>
            <Typography
               variant="subtitle2" component="div" color='secondary'
            >
              {game.released ? game.released : 'TBA'}  
            </Typography>
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
               variant="h2" component="h2" color='secondary'
            >
              {game ? game.name : null}  
            </Typography>
        </Container>
    );
};

export default GamePage;