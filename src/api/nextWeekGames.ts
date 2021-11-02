import { API_KEY } from "../App";

const gamesCounter = (nowStr: string, lastDaysStr: string) => {
    fetch(`https://api.rawg.io/api/games?games_count&dates=${nowStr},${lastDaysStr}&page=${pageNum}&key=${API_KEY}`)
    .then(res => res.json())
    .then(
    (result) => {
        console.log(result);
    },
    (error) => {
        console.log(error);
    }
    );
};

const getNextWeekGames = (pageNum: number, setGames: React.Dispatch<React.SetStateAction<never[]>>) => {
    const now = new Date();
    const nowStr = now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace(/\./g,'');
    const lastDays = new Date(now.getFullYear(), now.getMonth(), now.getDate()+7);
    const lastDaysStr = lastDays.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace(/\./g,'');
    let resultArr;
    gamesCounter(nowStr, lastDaysStr);
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
