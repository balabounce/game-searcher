import { API_KEY } from "../App";

const getPopularGames = (pageNum: number, setGames: React.Dispatch<React.SetStateAction<never[]>>) => {
    const now = new Date();
    const nowStr = now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace(/\./g,'');
    // const lastDays = new Date(now.getFullYear(), now.getMonth(), now.getDate()-7);
    // const lastDaysStr = lastDays.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace(/\./g,'');
    let resultArr;

    fetch(`https://api.rawg.io/api/games?rating_top&dates=2020-01-01,2020-12-31&page=${pageNum}&key=${API_KEY}`)
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

export default getPopularGames;
