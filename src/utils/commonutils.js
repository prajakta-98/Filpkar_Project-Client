


export const addEllipsis = (text) => {
if(text.lenght>80){
    return text.substring(0, 80) + '...';
}
return text;
}