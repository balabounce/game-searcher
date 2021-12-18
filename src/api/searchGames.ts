import { API_KEY } from "../App";

interface Iplatform {
    id: number,
    name: string,
    slug: string
}

interface IfoundGames {
    image: string,
    name: string,
    platforms: Iplatform[]
}

const searchGame = (input: string):Promise<any> => {
    let resultArr:any[] = [];
    //gamesCounter('', '', setCount, `https://api.rawg.io/api/games?search=${input}&key=${API_KEY}`);
        return fetch(`https://api.rawg.io/api/games?search=${input}&key=${API_KEY}`)
            .then(res => res.json())
            .then(
            (result) => {
                if(input.length >= 3) {
                    resultArr = result.results;
                    const foundGamesArr:IfoundGames[] = [];
                    let gameObj: IfoundGames = {} as IfoundGames;
                    resultArr.forEach((game) => {
                        gameObj.image = game.background_image;
                        gameObj.name = game.name;
                        gameObj.platforms = game.parent_platforms;
                        foundGamesArr.push(gameObj);
                        gameObj = {} as IfoundGames;
                    });
                    return foundGamesArr;
                } else return null;
            },
            (error) => {
                console.log(error);
            }
        );

};

export default searchGame;
