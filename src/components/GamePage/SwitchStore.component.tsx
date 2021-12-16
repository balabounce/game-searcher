import React from "react";
import { Grid, Link, Button } from "@mui/material";
import gog from './gog.svg';
import epicGames from './epic-games.svg';
import nintendoStore from './nintendo-switch.png';
import { faApple, faAppStore, faPlaystation, faSteam, faWindows, faXbox } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const switcher = (name: string, url:string): JSX.Element|null => {
    switch(name) {
        case 'GOG' :
            return  <Grid item  className='grid_item' xs={4} sx={{paddingLeft: '8px !important', height: '60px'}}>
                <Link target="_blank" rel="noopener" href={url}>
                    <Button variant="contained" color='secondary' className='screen_btn'>
                        GOG
                        <img src={gog} alt="gog" className='icon_store' style={{width: '40px', height: '50px'}}/>
                    </Button>
                </Link>
            </Grid>;
        case 'Epic Games' :
            return  <Grid item  className='grid_item' xs={4} sx={{paddingLeft: '8px !important', height: '60px'}}>
                <Link target="_blank" rel="noopener" href={url}>
                    <Button variant="contained" color='secondary' className='screen_btn'>
                        Epic Games
                        <img src={epicGames} alt="gog" className='icon_store' style={{width: '40px', height: '50px'}}/>
                    </Button>
                </Link>
            </Grid>;
        case 'Steam' :
            return  <Grid item  className='grid_item' xs={4} sx={{paddingLeft: '8px !important', height: '60px'}}>
                <Link target="_blank" rel="noopener" href={url}>
                    <Button variant="contained" color='secondary' className='screen_btn'>
                        Steam
                        <FontAwesomeIcon className='icon_store' icon={faSteam} style={{width: '2em'}}/>
                    </Button>
                </Link>
            </Grid>;
        case 'App Store':
            return  <Grid item  className='grid_item' xs={4} sx={{paddingLeft: '8px !important', height: '60px'}}>
                <Link target="_blank" rel="noopener" href={url}>
                    <Button variant="contained" color='secondary' className='screen_btn'>
                        App Store
                        <FontAwesomeIcon className='icon_store' icon={faAppStore} style={{width: '2em'}}/>
                    </Button>
                </Link>
            </Grid>;
        case 'Nintendo Store': 
            return  <Grid item  className='grid_item' xs={4} sx={{paddingLeft: '8px !important', height: '60px'}}>
                <Link target="_blank" rel="noopener" href={url}>
                        <Button variant="contained" color='secondary' className='screen_btn'>
                            Nintendo Store
                            <img src={nintendoStore} alt="nintendo store" className='icon_store' style={{width: '30px', height: '30px', color: 'black'}}/>
                        </Button>
                </Link>
                </Grid>;
        case 'Xbox Store': 
            return  <Grid item  className='grid_item' xs={4} sx={{paddingLeft: '8px !important', height: '60px'}}>
                <Link target="_blank" rel="noopener" href={url}>
                        <Button variant="contained" color='secondary' className='screen_btn'>
                            Xbox Store
                            <FontAwesomeIcon className='icon_store' icon={faXbox} style={{width: '2em'}}/>
                        </Button>
                </Link>
                </Grid>;
        case 'PlayStation Store': 
            return  <Grid item  className='grid_item' xs={4} sx={{paddingLeft: '8px !important', height: '60px'}}>
                <Link target="_blank" rel="noopener" href={url}>
                        <Button variant="contained" color='secondary' className='screen_btn'>
                            Playstation Store
                            <FontAwesomeIcon className='icon_store' icon={faPlaystation} style={{width: '2em'}}/>
                        </Button>
                </Link>
                </Grid>;
        default: 
        return null;
}
};


const SwitchStore: React.FC<{name: string, url: string}> = ({name, url}):JSX.Element => {
    return (
    <> 
        {switcher(name, url)}
    </>
    );
};

export default SwitchStore;