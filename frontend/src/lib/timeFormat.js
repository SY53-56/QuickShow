const timeFormat = (min)=>{
    const hours = Math.floor(min/60);
    const mintesRemainder = min%60
    return `${hours}h ${mintesRemainder}m`
}
export default timeFormat