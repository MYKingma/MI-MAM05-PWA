import db from "../main";
import { collection, query, getDocs, where } from "firebase/firestore";

const getData = async (collectionString, attribute, operator, value) => {
  const collectionReference = collection(db, collectionString);
  const filter = attribute ? where(attribute, operator, value) : undefined;
  const q = filter
    ? query(collectionReference, filter)
    : query(collectionReference);
  const result = await getDocs(q);
  const data = [];
  result.forEach((item) => {
    data.push(item.data());
  });
  return data;
};

const getCollection = async (collectionString) => {
  const collectionReference = collection(db, collectionString);
  return collectionReference;
};

export { getData, getCollection };
