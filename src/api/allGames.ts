import { API_KEY } from "../App";

const getAllGames = (pageNum: number, setGames: React.Dispatch<React.SetStateAction<never[]>>) => {
    let resultArr;
    fetch(`https://api.rawg.io/api/games?page=${pageNum}&key=${API_KEY}`)
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