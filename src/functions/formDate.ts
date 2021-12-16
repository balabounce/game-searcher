export const formReleaseDate = (date: string) => {
    const month = +date.slice(5,7) - 1;
    const year = date.slice(0,4);
    const day = date.slice(8, 10);
    const monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];
    const result =  `${monthNames[month].toUpperCase()} ${day}, ${year}`;
    return result;
};