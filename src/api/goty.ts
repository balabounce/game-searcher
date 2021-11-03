import { API_KEY } from "../App";
import gamesCounter from "../functions/gamesCounter";

const getGoty = (pageNum: number, setGames: React.Dispatch<React.SetStateAction<never[]>>, setCount: React.Dispatch<React.SetStateAction<number>>) => {
    const now = new Date();
    const nowStr = now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace(/\./g,'');
    let resultArr;

    gamesCounter(`${now.getFullYear()}-01-01`, nowStr, setCount, `https://api.rawg.io/api/games?rating_top&games_count&dates=${now.getFullYear()}-01-01,${nowStr}&key=${API_KEY}`);
    fetch(`https://api.rawg.io/api/games?rating_top&dates=${now.getFullYear()}-01-01,${nowStr}&page=${pageNum}&key=${API_KEY}`)
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

export default getGoty;
