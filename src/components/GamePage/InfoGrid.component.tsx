import React from "react";
import { Container, Grid, Link, Typography } from "@mui/material";
import { formReleaseDate } from "../../functions/formDate";

interface IRequire {
    minimum?: string,
    recommended: string
}

const writeSysReq = (platformsArr: any[]) => {
    let node: JSX.Element|null = null;
    platformsArr.map((platform, i) => {
        if(platform.platform.name === 'PC' && platform.requirements) {
            const minArr = platform.requirements.minimum ? platform.requirements.minimum.split('\n').splice(1) : null;
            const recArr = platform.requirements.recommended ? platform.requirements.recommended.split('\n').splice(1) : null; 
            console.log(minArr);
            node = (
                <div key={i}>
                    {}
                    <strong>Minimum:</strong>
                    <ul>
                        {minArr ? minArr.map((rec: string) => <li>{rec}</li>) : 'Not published yet'}
                    </ul>
                    <strong>Recommended:</strong>
                    <ul>
                        {recArr ? recArr.map((rec: string) => <li>{rec}</li>) : 'Not published yet'}
                    </ul>
                </div>
            );
        } 
    });
    return node;
};

const writeInfo = (arr: any[] | undefined, about: string) => {
    const result: string|null[] = [];
    arr?.map(item => {
        let name;
        if(about === 'platforms') {
            name = item.platform.name;
        } else {
            name = item.name;
        }
        result.push(name);
    });

    return result.join(', ');
};


const InfoGrid: React.FC<{game: any|undefined}> = ({game}): JSX.Element => {
    console.log(game);
    return (<> 
        <Grid container spacing={2} ml={0}>
                <Grid item className='grid_item' xs={4}>
                    <Container className='grid_container'>
                        <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                            Platforms
                        </Typography>
                        <Typography variant="body1" className='grid_body' component="span" color='secondary'>
                            {game && game.platforms ? writeInfo(game.platforms, 'platforms') : null}
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={6} className='grid_item'>
                    <Container className='grid_container'>
                        <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                            Genre
                        </Typography>
                        <Typography variant="body1" className='grid_body' component="span" color='secondary'>
                        {game && game.genres ? writeInfo(game.genres, 'genres') : null}
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={4} className='grid_item'>
                    <Container className='grid_container'>
                        <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                            Release Date
                        </Typography>
                        <Typography variant="body1" className='grid_body' component="span" color='secondary'>
                        {game && game.released ? formReleaseDate(game.released) : 'TBA'}
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={6} className='grid_item'>
                    <Container className='grid_container'>
                        <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                            Developer
                        </Typography>
                        <Typography variant="body1" className='grid_body' component="span" color='secondary'>
                        {game && game.developers ? writeInfo(game.developers, 'developers') : null}
                        </Typography>
                    </Container>
                </Grid>   
                <Grid item  className='grid_item' xs={4}>
                    <Container className='grid_container'>
                        <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                            Publisher
                        </Typography>
                        <Typography variant="body1" className='grid_body' component="span" color='secondary'>
                            {game && game.publishers ? writeInfo(game.publishers, 'publishers') : null}
                        </Typography>
                    </Container>
                </Grid>  
                <Grid item xs={6} className='grid_item'>
                    <Container className='grid_container'>
                        <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                            Age rating
                        </Typography>
                        <Typography variant="body1" className='grid_body' component="span" color='secondary'>
                            {game && game.esrb_rating ? game.esrb_rating.name : 'Not rated yet'}
                        </Typography>
                    </Container>
                </Grid>  
                <Grid item xs={8} className='grid_item'>
                    <Container className='grid_container'>
                        <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                            Tags
                        </Typography>
                        <Typography variant="body1" className='grid_body' component="span" color='secondary'>
                            {game && game.tags ? writeInfo(game.tags, 'tags') : '-'}
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={8} className='grid_item' sx={{marginLeft : '0px !important'}}>
                    <Container className='grid_container'>
                        <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                            Website
                        </Typography>
                        <Typography variant="body1" className='grid_body' component="span" color='secondary'>
                            {game && game.website ? 
                            <Link href={game.website} color='secondary' sx={{cursor: 'pointer'}}>{game.website}</Link>
                            : '-'}
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={8} className='grid_item' sx={{marginLeft : '0px !important'}}>
                    <Container className='grid_container'>
                        <Typography variant="h5" component="h5" color='secondary' sx={{opacity: '.5', marginRight: '5px', marginBottom:'5px'}}>
                            System Requirements
                        </Typography>
                        <Typography variant="body1" className='grid_body' component="span" color='secondary'>
                            {game && game.platforms ? writeSysReq(game.platforms) : null}
                        </Typography>
                    </Container>
                </Grid>                            
            </Grid>
    </>);
};

export default InfoGrid;
