import { collection, query, getDocs, where } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../main";

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

const getFiles = async (filePathArray) => {
  const pathReferences = [];
  await Promise.all(
    filePathArray.map(async (filePath) => {
      const fileRef = ref(storage, `${filePath}`);
      const fileURL = await getDownloadURL(fileRef);
      pathReferences.push({
        filePath,
        url: fileURL,
      });
    })
  );
  return pathReferences;
};

export { getData, getCollection, getFiles };
