import mongoose, { Schema, Document } from 'mongoose';
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

export interface InnerObjectType extends Document {
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
  userId: mongoose.Types.ObjectId; // Explicitly type userId as ObjectId
}

export interface FilteredObjectType {
  Name?: boolean;
  Class?: boolean;
  Section?: boolean;
  RollNo?: boolean;
  Department?: boolean;
  Email?: boolean;
  PhoneNumber?: boolean;
  hash?: string;
  Title?: string;
  Deadline?: string;
  userId?: mongoose.Types.ObjectId;
}
  
export function filterObjectProperties(originalArray: InnerObjectType[]): FilteredObjectType[] {
  const keysToRemove: string[] = ["Questions", "Description"];
  const filteredArray: FilteredObjectType[] = [];

  for (const innerObject of originalArray) {
      console.log('Original object BEFORE filtering:', innerObject); // Keep this log for debugging
      const filteredInnerObject: Partial<FilteredObjectType> = {};

      for (const innerKey in innerObject) {
          // TEMPORARILY SIMPLIFY - REMOVE hasOwnProperty for now for debugging
          // if (Object.prototype.hasOwnProperty.call(innerObject, innerKey)) {
              if (!keysToRemove.includes(innerKey)) {
                //@ts-ignore
                  filteredInnerObject[innerKey] = innerObject[innerKey];
              }
          // }
      }
      console.log('Filtered object AFTER filtering:', filteredInnerObject); // Keep this log
      filteredArray.push(filteredInnerObject as FilteredObjectType);
  }

  return filteredArray;
}