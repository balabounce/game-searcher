import { API_KEY } from "../App";

const getTopGames = (pageNum: number, setGames: React.Dispatch<React.SetStateAction<never[]>>, setCount: React.Dispatch<React.SetStateAction<number>>) => {
    let resultArr;
    fetch(`https://api.rawg.io/api/games?rating_top&page=${pageNum}&key=${API_KEY}`)
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

export default getTopGames;
