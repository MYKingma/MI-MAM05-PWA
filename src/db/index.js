import {
  collection,
  query,
  getDocs,
  where,
  documentId,
  addDoc,
  deleteDoc,
  // getDoc,
  setDoc,
} from "firebase/firestore";
// import { ref, getDownloadURL } from "firebase/storage";
import { db } from "../main";

const getCollection = async (collectionString) => {
  const collectionReference = collection(db, collectionString);
  return collectionReference;
};

const getNestedData = async (parentRef, nestedCollectionString) => {
  const collectionReference = collection(parentRef, nestedCollectionString);
  const q = query(collectionReference);
  const result = await getDocs(q);
  const data = result.docs[0]?.data();
  if (data) data.id = result.docs[0].id;
  return data;
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
    itemData.id = item.id;
    response.push(itemData);
  });
  if (collectionString === "cases" || collectionString === "phases") {
    const ref = result.docs[0].ref;
    const nestedCollectionString =
      collectionString === "cases" ? "patient" : "outcome";
    const nestedObject = await getNestedData(ref, nestedCollectionString);
    if (nestedObject) response[0][nestedCollectionString] = nestedObject;
  }
  return response;
};

const getDataOnId = async (collectionString, value) => {
  const collectionReference = collection(db, collectionString);
  const filter = where(documentId(), "==", value);
  const q = query(collectionReference, filter);
  const result = await getDocs(q);
  console.log(collectionString, value, result);
  const data = result.docs[0].data();
  if (collectionString === "cases" || collectionString === "phases") {
    const ref = result.docs[0].ref;
    const nestedCollectionString =
      collectionString === "cases" ? "patient" : "outcome";
    const nestedObject = await getNestedData(ref, nestedCollectionString);
    if (nestedObject) data[nestedCollectionString] = nestedObject;
  }
  data.id = result.docs[0].id;
  return data;
};

const getRefOnId = async (collectionString, value) => {
  const collectionReference = collection(db, collectionString);
  const filter = where(documentId(), "==", value);
  const q = query(collectionReference, filter);
  const result = await getDocs(q);
  const ref = result.docs[0].ref;
  return ref;
};

const getDataArrayOnIds = async (collectionString, idArray) => {
  const resultArray = [];
  const collectionReference = collection(db, collectionString);
  await Promise.all(
    idArray.map(async (id) => {
      const filter = where(documentId(), "==", id);
      const q = query(collectionReference, filter);
      const result = await getDocs(q);
      const data = result.docs[0].data();
      data.id = result.docs[0].id;
      if (collectionString === "phases" || collectionString === "cases") {
        const ref = result.docs[0].ref;
        const nestedCollectionString =
          collectionString === "cases" ? "patient" : "outcome";
        const nestedObject = await getNestedData(ref, nestedCollectionString);
        if (nestedObject) data[nestedCollectionString] = nestedObject;
      }
      resultArray.push(data);
    })
  );
  return resultArray;
};

// const getFiles = async (filePathArray) => {
//   const pathReferences = [];
//   await Promise.all(
//     filePathArray.map(async (filePath) => {
//       const fileRef = ref(storage, `${filePath}`);
//       const fileURL = await getDownloadURL(fileRef);
//       pathReferences.push({
//         filePath,
//         url: fileURL,
//       });
//     })
//   );
//   return pathReferences;
// };

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const uploadImages = async (base64Array) => {
  const imagesRef = await getCollection("images");
  const imageIdArray = [];
  await Promise.all(
    base64Array.map(async (base64Item) => {
      const result = await addDoc(imagesRef, {
        base64: base64Item.base64,
      });
      imageIdArray.push(result.id);
    })
  );
  return imageIdArray;
};

const addData = async (collectionString, data) => {
  const collectionRef = await getCollection(collectionString);
  const result = await addDoc(collectionRef, data);
  return result;
};

const updateData = async (docRef, data) => {
  await setDoc(docRef, data, { merge: true });
};

const addNestedData = async (parentRef, collectionString, data) => {
  const collectionRef = collection(parentRef, collectionString);
  const result = await addDoc(collectionRef, data);
  return result;
};

const getCaseOnId = async (caseID) => {
  const data = await getDataOnId("cases", caseID);
  if (data.date) data.date = new Date(data.date.seconds * 1000);
  data.phases = await getDataArrayOnIds("phases", data.phases);
  return data;
};

const setTest = async () => {
  updateData("test", { test: "test", test2: "test2" });
};

const updatePhase = async (phaseData) => {
  const newPhaseData = {
    type: phaseData.type,
    answer: phaseData.answer,
    wrongAnswer: phaseData.wrongAnswer,
  };
  if (phaseData.images) newPhaseData["images"] = phaseData.images;
  const phaseRef = phaseData.id
    ? await getRefOnId("phases", phaseData.id)
    : await addData("phases", newPhaseData);
  await updateData(phaseRef, newPhaseData);
  if ("outcome" in phaseData) {
    const newOutcomeData = {};
    Object.keys(phaseData.outcome).forEach((attribute) => {
      if (attribute !== "id") {
        newOutcomeData[attribute] = phaseData.outcome[attribute];
      }
    });
    // phaseData.outcome.type === "string"
    //   ? {
    //       type: phaseData.outcome.type,
    //       string: phaseData.outcome.string,
    //     }
    //   : {
    //       type: phaseData.outcome.type,
    //       bloodPressure: phaseData.outcome.bloodPressure,
    //       bloodSaturation: phaseData.outcome.bloodSaturation,
    //       breathRate: phaseData.outcome.breathRate,
    //       heartRate: phaseData.outcome.heartRate,
    //       temperature: phaseData.outcome.temperature,
    //     };
    const outcomeRef = phaseData.outcome.id
      ? await getNestedRefOnId(phaseRef, "outcome", phaseData.outcome.id)
      : await addNestedData(phaseRef, "outcome", newOutcomeData);
    await updateData(outcomeRef, newOutcomeData);
  }
  return phaseRef.id;
};

const getNestedRefOnId = async (parentRef, collectionString, value) => {
  const collectionReference = collection(parentRef, collectionString);
  const filter = where(documentId(), "==", value);
  const q = query(collectionReference, filter);
  const result = await getDocs(q);
  const ref = result.docs[0].ref;
  return ref;
};

const setCaseData = async (caseData) => {
  const newCaseData = {
    uid: caseData.uid,
    specialism: caseData.specialism,
    mainProblem: caseData.mainProblem,
    introduction: caseData.introduction,
    date: caseData.date,
  };
  if (caseData.images) newCaseData["images"] = caseData.images;
  const caseRef = caseData.id
    ? await getRefOnId("cases", caseData.id)
    : await addData("cases", newCaseData);
  await updateData(caseRef, newCaseData);
  const scrambledPhaseIdObjectArray = [];
  await Promise.all(
    caseData.phases.map(async (phaseData, index) => {
      const phaseId = await updatePhase(phaseData);
      scrambledPhaseIdObjectArray.push({
        index: index,
        phaseId: phaseId,
      });
    })
  );
  const phaseIdArray = scrambledPhaseIdObjectArray
    .sort((a, b) => {
      return a.index - b.index;
    })
    .map((phaseIdObject) => phaseIdObject.phaseId);
  await updateData(caseRef, {
    phases: phaseIdArray,
  });
  const newPatientData = {
    age: caseData.patient.age,
    gender: caseData.patient.gender,
    ethnicity: caseData.patient.ethnicity,
    medicalHistory: caseData.patient.medicalHistory,
    medication: caseData.patient.medication,
  };
  const patientRef = caseData.patient.id
    ? await getNestedRefOnId(caseRef, "patient", caseData.patient.id)
    : await addNestedData(caseRef, "patient", newPatientData);
  await updateData(patientRef, newPatientData);
  return caseRef.id;
};

const deleteNestedData = async (parentRef, nestedCollectionString) => {
  const collectionReference = collection(parentRef, nestedCollectionString);
  const q = query(collectionReference);
  const result = await getDocs(q);
  const ref = result.docs[0].ref;
  console.log(await deleteDoc(ref));
  await deleteDoc(parentRef);
};

const deleteDataOnId = async (collectionString, value) => {
  const collectionReference = collection(db, collectionString);
  const filter = where(documentId(), "==", value);
  const q = query(collectionReference, filter);
  const result = await getDocs(q);
  const ref = result.docs[0].ref;
  if (collectionString === "cases" || collectionString === "phases") {
    const nestedCollectionString =
      collectionString === "cases" ? "patient" : "outcome";
    await deleteNestedData(ref, nestedCollectionString);
  } else {
    await deleteDoc(ref);
  }
};

const deleteCaseOnId = async (caseId) => {
  const caseData = await getDataOnId("cases", caseId);
  await caseData.phases.forEach(async (phase) => {
    await deleteDataOnId("phases", phase.id);
  });
  deleteDataOnId("cases", caseId);
};

export {
  getData,
  getCollection,
  // getFiles,
  getDataOnId,
  uploadImages,
  getDataArrayOnIds,
  addData,
  toBase64,
  getCaseOnId,
  setCaseData,
  setTest,
  deleteDataOnId,
  deleteCaseOnId,
};
