const gamesCounter = (nowStr: string, lastDaysStr: string, setCount: React.Dispatch<React.SetStateAction<number>>, res: string): void => {
    fetch(res)
    .then(res => res.json())
    .then(
    (result) => {
        const count = (Math.ceil(result.count/20)) > 100 ? 100 : (Math.ceil(result.count/20));
        setCount(count);
    },
    (error) => {
        console.log(error);
    }
    );
};

export default gamesCounter;