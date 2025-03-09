
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

export interface InnerObjectType { // Define an interface for the inner objects (optional, but good practice)
    Name?: boolean;
    Class?: boolean;
    Section?: boolean;
    RollNo?: boolean;
    Department?: boolean;
    Email?: boolean;
    PhoneNumber?: boolean;
    hash?: string;
    Questions?: string;
    Title?: string;
    Description?: string;
    Deadline?: string;
    userId?: any; // Or mongoose.Types.ObjectId if you are using mongoose types directly
    [key: string]: any; // Allow other properties (for flexibility)
  }
  
  export function filterObjectProperties(originalArray: InnerObjectType[]): InnerObjectType[] {
    const keysToRemove: string[] = ["Title", "hash", "Questions", "Description"];
    const filteredArray: InnerObjectType[] = []; // Initialize an empty array to hold filtered objects
  
    for (let i = 0; i < originalArray.length; i++) { // Loop through the array
      const innerObject: InnerObjectType = originalArray[i]; // Get each object from the array
      const filteredInnerObject: Partial<InnerObjectType> = {}; // Use Partial to allow subset of properties
  
      for (const innerKey in innerObject) {
        if (innerObject.hasOwnProperty(innerKey)) {
          if (!keysToRemove.includes(innerKey)) {
            filteredInnerObject[innerKey] = innerObject[innerKey];
          }
        }
      }
      filteredArray.push(filteredInnerObject as InnerObjectType); // Type assertion because Partial is used
    }
  
    return filteredArray;
  }