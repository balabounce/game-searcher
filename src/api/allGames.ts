import { API_KEY } from "../App";
import gamesCounter from "../functions/gamesCounter";

const getAllGames = (pageNum: number, setGames: React.Dispatch<React.SetStateAction<never[]>>, setCount: React.Dispatch<React.SetStateAction<number>>) => {
    const now = new Date();
    now.setDate(1);
    const nowStr = now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace(/\./g,'');
    const lastDays = new Date(now.getFullYear()+1, now.getMonth()+2, now.getDate());
    const lastDaysStr = lastDays.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace(/\./g,'');
    let resultArr;
    
    gamesCounter(lastDaysStr, nowStr, setCount, `https://api.rawg.io/api/games?games_count&rating_top&dates=${nowStr},${lastDaysStr}&key=${API_KEY}`);

    fetch(`https://api.rawg.io/api/games?rating=100&dates=${nowStr},${lastDaysStr}&page=${pageNum}&key=${API_KEY}`)
    .then(res => res.json())
    .then(
    (result) => {
        resultArr = result.results ;
        // console.log(resultArr);
        setGames(resultArr);
    },
    (error) => {
        console.log(error);
    }
    );
};

export default getAllGames;