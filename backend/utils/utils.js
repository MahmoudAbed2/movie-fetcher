const generateId = () => {
    let chars = '0123456789';
    let code = [];

    for(let i = 0; i < 7; i++){
        let rand = Math.floor(Math.random() * chars.length);
        code.push(chars[rand]);
    }

    return code.join('');
}

export default generateId;