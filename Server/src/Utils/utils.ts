
interface DataObject {
    [key: string]: any; 
}

export function filterNullValues(dataObject: DataObject) : DataObject {
    const filteredData: DataObject = {};
    for (const key in dataObject) {
        if (dataObject.hasOwnProperty(key)) {
            const value = dataObject[key];
            if (value !== null) {
                filteredData[key] = value;
            }
        }
    }
    return filteredData;
}

export function randomHash(len: number, userId: string ){
    const length = userId.length;
    let hash:string = "";
    for(let i = 0; i < len; i++){
        hash += userId[Math.floor(Math.random()*len)]
    } return hash;
}