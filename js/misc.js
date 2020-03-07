function generateRandomID() {
    let id = '';
    for (let i=0; i<16; i++) {
        id +=~~((Math.random()*9)+1).toString();
    }
    return id;
}