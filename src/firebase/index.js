import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { getCollection } from "../db";
import { storage, auth } from "../main";

const register = async (newUser) => {
  const user = await createUserWithEmailAndPassword(
    auth,
    newUser.email,
    newUser.password
  );
  const profiles = await getCollection("profiles");
  await setDoc(doc(profiles, user.user.uid), {
    uid: user.user.uid,
    name: newUser.name,
    role: newUser.role.toLowerCase(),
  });
};

const uploadFiles = async (refString, filesArray) => {
  filesArray.forEach(async (file) => {
    const storageRef = ref(storage, `${refString}/${Date.now()}_${file.name}`);
    const filepathArray = [];
    try {
      const result = await uploadBytes(storageRef, file);
      filepathArray.push(result.fullPath);
    } catch (error) {
      console.log(error);
    }
  });
};

export { register, uploadFiles };
