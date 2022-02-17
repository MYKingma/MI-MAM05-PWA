import {
  collection,
  query,
  getDocs,
  where,
  documentId,
} from "firebase/firestore";
import { ref, getDownloadURL, getBlob } from "firebase/storage";
import { db, storage } from "../main";

const getCollection = async (collectionString) => {
  const collectionReference = collection(db, collectionString);
  return collectionReference;
};

const getPatientFromCase = async (caseRef) => {
  const collectionReference = collection(caseRef, "patient");
  const q = query(collectionReference);
  const result = await getDocs(q);
  return result.docs[0].data();
};
const getData = async (collectionString, attribute, operator, value) => {
  const collectionReference = await getCollection(collectionString);
  const filter = attribute ? where(attribute, operator, value) : undefined;
  const q = filter
    ? query(collectionReference, filter)
    : query(collectionReference);
  const result = await getDocs(q);
  const response = [];
  result.forEach((item) => {
    const itemData = item.data();
    response.push(itemData);
  });
  if (collectionString === "cases") {
    const ref = result.docs[0].ref;
    response[0]["patient"] = await getPatientFromCase(ref);
  }
  return response;
};

const getDataOnId = async (collectionString, value) => {
  const collectionReference = collection(db, collectionString);
  const filter = where(documentId(), "==", value);
  const q = filter
    ? query(collectionReference, filter)
    : query(collectionReference);
  const result = await getDocs(q);
  const data = result.docs[0].data();
  return data;
};

const getFiles = async (filePathArray) => {
  const pathReferences = [];
  await Promise.all(
    filePathArray.map(async (filePath) => {
      const fileRef = ref(storage, `${filePath}`);
      const fileURL = await getDownloadURL(fileRef);
      const fileBlob = await getBlob(fileRef);
      console.log(fileBlob);
      pathReferences.push({
        filePath,
        url: fileURL,
        // blob: fileBlob,
      });
    })
  );
  return pathReferences;
};

// const specialisms = ["Cardiology", "Clinical genetics", "Clinical microbiology", "Dermatology", "Emergency department choose", "Family medicine", "Gastroenterology", "Geriatric medicine", "Gynaecology", "Insurance medicine", "Internal medicine", "Neurology", "Occupational medicine", "Ophthalmology", "Orthopedics", "Otolaryngology", "Pathology", "Pediatrics", "Psychiatry", "Pulmonary medicine", "Radiology", "Rehabilitation medicine", "Rheumatology", "Sports medicine", "Surgery"];
//     specialisms.forEach(async (item) => {
//       const specRef = await getCollection("specialisms");
//       await setDoc(doc(specRef), {
//         name: item
//       });
//     })

export { getData, getCollection, getFiles, getDataOnId };
