// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userLocalCheck = (): any => {
    if(localStorage.getItem('user')) {
        const userText = localStorage.getItem('user') as string;
        return JSON.parse(userText);
      } else {
        return null;
    }
};

export default userLocalCheck;