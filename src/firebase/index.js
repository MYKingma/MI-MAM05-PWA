import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, updateMetadata } from "firebase/storage";
import { getCollection } from "../db";
import { storage, auth } from "../main";
import router from "../router";

const register = async (newUser) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      newUser.email,
      newUser.password
    );
    updateProfile(auth.currentUser, { displayName: newUser.name });
    sendEmailVerification(auth.currentUser);
    const profiles = await getCollection("profiles");
    await setDoc(doc(profiles, user.user.uid), {
      uid: user.user.uid,
      name: newUser.name,
      role: newUser.role.toLowerCase(),
    });
    router.push("/email_not_verified");
  } catch (error) {
    let errorMessage = "";
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email";
        break;
      case "auth/user-not-found":
        errorMessage = "No account with that email was found";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password";
        break;
      default:
        errorMessage = "Email or password was incorrect";
        break;
    }
    return errorMessage;
  }
};

const resendEmailVerification = async () => {
  sendEmailVerification(auth.currentUser);
};

const logIn = async (loginUser) => {
  await signInWithEmailAndPassword(auth, loginUser.email, loginUser.password);
};

const logOut = async () => {
  await signOut(auth);
  router.push("/");
};

const uploadFiles = async (refString, filesArray) => {
  const filepathArray = [];
  filesArray.forEach(async (file) => {
    const storageRef = ref(storage, `${refString}/${Date.now()}_${file.name}`);
    try {
      const result = await uploadBytes(storageRef, file);
      await updateMetadata(storageRef, { cacheControl: "public" });
      filepathArray.push(result.fullPath);
    } catch (error) {
      console.log(error);
    }
  });
};

export { register, logIn, logOut, resendEmailVerification, uploadFiles };
