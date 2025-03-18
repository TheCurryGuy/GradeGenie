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
      const filteredInnerObject: Partial<FilteredObjectType> = {};

      for (const innerKey in innerObject) {
              if (!keysToRemove.includes(innerKey)) {
                //@ts-ignore
                  filteredInnerObject[innerKey] = innerObject[innerKey];
              }
      }
      filteredArray.push(filteredInnerObject as FilteredObjectType);
  }

  return filteredArray;
}