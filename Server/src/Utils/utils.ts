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
export interface FilteredSecondObjectType {
  Name?: boolean;
  Class?: boolean;
  Section?: boolean;
  RollNo?: boolean;
  Department?: boolean;
  Email?: boolean;
  PhoneNumber?: boolean;
  Title?: string;
  Deadline?: string;
  userId: string; // Change userId to string
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
  _id?: string;
}

export interface ThirdFilteredObjectType {
  Name?: boolean;
  hash?: string;
  Title?: string;
  Deadline?: string;
  Description?:string;
  userId?: mongoose.Types.ObjectId;
  _id?: string;
}
  
  
export function filterObjectProperties(originalArray: InnerObjectType[]): FilteredObjectType[] {
  const allowedKeys: (keyof FilteredObjectType)[] = [
    'Name', 'Class', 'Section', 'RollNo', 'Department', 'Email', 'PhoneNumber',
    'hash', 'Title', 'Deadline', 'userId', '_id'
  ];

  return originalArray.map(innerObject => {
    // Convert Mongoose document to plain object, preserving ObjectId types
    const plainObject = innerObject.toObject?.({ getters: false }) || { ...innerObject };

    const filteredInnerObject: Partial<FilteredObjectType> = {};

    // Copy allowed keys
    for (const key of allowedKeys) {
      if (plainObject[key] !== undefined) {
        filteredInnerObject[key] = plainObject[key];
      }
    }

    delete (filteredInnerObject as any).__v;
    delete (filteredInnerObject as any).Questions;
    delete (filteredInnerObject as any).Description;

    return filteredInnerObject as FilteredObjectType;
  });
}
export function ThirdfilterObjectProperties(originalArray: InnerObjectType[]): ThirdFilteredObjectType[] {
  const allowedKeys: (keyof ThirdFilteredObjectType)[] = [
    'Name', 'hash', 'Title', 'Deadline', 'userId', '_id', 'Description'
  ];

  return originalArray.map(innerObject => {
    // Convert Mongoose document to plain object, preserving ObjectId types
    const plainObject = innerObject.toObject?.({ getters: false }) || { ...innerObject };

    const filteredInnerObject: Partial<ThirdFilteredObjectType> = {};

    // Copy allowed keys
    for (const key of allowedKeys) {
      if (plainObject[key] !== undefined) {
        filteredInnerObject[key] = plainObject[key];
      }
    }

    delete (filteredInnerObject as any).__v;
    delete (filteredInnerObject as any).Questions;
    delete (filteredInnerObject as any).Class;
    delete (filteredInnerObject as any).Section;
    delete (filteredInnerObject as any).RollNo;
    delete (filteredInnerObject as any).Department;
    delete (filteredInnerObject as any).Email;
    delete (filteredInnerObject as any).PhoneNumber;

    return filteredInnerObject as ThirdFilteredObjectType;
  });
}


  
export function filterSecondObjectProperties(originalObject: InnerObjectType): FilteredSecondObjectType {
  // Explicit list of allowed properties from FilteredSecondObjectType
  const allowedKeys: (keyof FilteredSecondObjectType)[] = [
    'Name', 'Class', 'Section', 'RollNo', 
    'Department', 'Email', 'PhoneNumber',
    'Title', 'Deadline', 'userId'
  ];

  const filteredObject: FilteredSecondObjectType = {} as FilteredSecondObjectType;

  // Convert MongoDB document to plain object if needed
  const plainObject = originalObject.toObject ? originalObject.toObject() : originalObject;

  for (const key of allowedKeys) {
    if (plainObject[key] !== undefined) {
      // For ObjectId fields, convert to string if needed
      if (key === 'userId' && plainObject[key] instanceof mongoose.Types.ObjectId) {
        (filteredObject as any)[key] = plainObject[key].toString();
      } else {
        (filteredObject as any)[key] = plainObject[key];
      }
    }
  }

  // Explicitly remove unwanted fields
  const finalFilteredObject = {
    ...filteredObject,
    _id: undefined,
    __v: undefined,
    hash: undefined,
    Questions: undefined,
    Description: undefined
  };

  return JSON.parse(JSON.stringify(finalFilteredObject)); // Remove undefined fields
}

