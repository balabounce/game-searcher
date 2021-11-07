import { API_KEY } from "../App";
import gamesCounter from "../functions/gamesCounter";

const searchGame = (pageNum: number, setGames: React.Dispatch<React.SetStateAction<never[]>>, setCount: React.Dispatch<React.SetStateAction<number>>, input: string):void => {
    let resultArr;
    gamesCounter('', '', setCount, `https://api.rawg.io/api/games?search=${input}&key=${API_KEY}`);
    fetch(`https://api.rawg.io/api/games?rating_top&dates=2020-01-01,2020-12-31&page=${pageNum}&key=${API_KEY}`)
    .then(res => res.json())
    .then(
    (result) => {
        resultArr = result.results ;
        setGames(resultArr);
    },
    (error) => {
        console.log(error);
    }
    );
};

export default searchGame;
