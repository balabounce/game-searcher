import { API_KEY } from "../App";

const getAllGames = (pageNum: number, setGames: React.Dispatch<React.SetStateAction<never[]>>) => {
    const now = new Date();
    now.setDate(1);
    const nowStr = now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace(/\./g,'');
    const lastDays = new Date(now.getFullYear()+1, now.getMonth()+2, now.getDate());
    const lastDaysStr = lastDays.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace(/\./g,'');
    let resultArr;
    fetch(`https://api.rawg.io/api/games?rating_top&dates=${nowStr},${lastDaysStr}&page=${pageNum}&key=${API_KEY}`)
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