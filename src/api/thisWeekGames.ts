import { API_KEY } from "../App";
import gamesCounter from "../functions/gamesCounter";

const getWeekGame = (pageNum: number, setGames: React.Dispatch<React.SetStateAction<never[]>>, setCount: React.Dispatch<React.SetStateAction<number>>): void => {
    const now = new Date();
    const nowStr = now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace(/\./g,'');
    const lastDays = new Date(now.getFullYear(), now.getMonth(), now.getDate()-7);
    const lastDaysStr = lastDays.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace(/\./g,'');
    let resultArr;
    
    gamesCounter(lastDaysStr, nowStr, setCount, `https://api.rawg.io/api/games?games_count&dates=${lastDaysStr},${nowStr}&key=${API_KEY}`);
    fetch(`https://api.rawg.io/api/games?dates=${lastDaysStr},${nowStr}&page=${pageNum}&key=${API_KEY}`)
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

export default getWeekGame;
