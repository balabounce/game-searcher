import { API_KEY } from "../App";
import gamesCounter from "../functions/gamesCounter";

// const gamesCounter = (nowStr: string, lastDaysStr: string, setCount: React.Dispatch<React.SetStateAction<number>>) => {
//     fetch(`https://api.rawg.io/api/games?games_count&dates=${nowStr},${lastDaysStr}&key=${API_KEY}`)
//     .then(res => res.json())
//     .then(
//     (result) => {
//         console.log(Math.ceil(result.count/20));
//         setCount(Math.ceil(result.count/20));
//     },
//     (error) => {
//         console.log(error);
//     }
//     );
// };

const getNextWeekGames = (pageNum: number, setGames: React.Dispatch<React.SetStateAction<never[]>>, setCount: React.Dispatch<React.SetStateAction<number>>) => {
    const now = new Date();
    const nowStr = now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace(/\./g,'');
    const lastDays = new Date(now.getFullYear(), now.getMonth(), now.getDate()+7);
    const lastDaysStr = lastDays.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace(/\./g,'');
    let resultArr;
    gamesCounter(nowStr, lastDaysStr, setCount, `https://api.rawg.io/api/games?games_count&dates=${nowStr},${lastDaysStr}&key=${API_KEY}`);
    fetch(`https://api.rawg.io/api/games?dates=${nowStr},${lastDaysStr}&page=${pageNum}&key=${API_KEY}`)
    .then(res => res.json())
    .then(
    (result) => {
        resultArr = result.results ;
        console.log(resultArr);
        setGames(resultArr);
    },
    (error) => {
        console.log(error);
    }
    );
};

export default getNextWeekGames;
