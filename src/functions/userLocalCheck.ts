const userLocalCheck = () => {
    if(localStorage.getItem('user')) {
        const userText = localStorage.getItem('user') as string;
        return JSON.parse(userText);
      } else {
        return null;
    }
};

export default userLocalCheck;