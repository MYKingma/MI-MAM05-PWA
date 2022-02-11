import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getCollection } from "../db";

const register = async (newUser) => {
  const auth = getAuth();
  const user = await createUserWithEmailAndPassword(
    auth,
    newUser.email,
    newUser.password
  );
  const profiles = await getCollection("profiles");
  await setDoc(doc(profiles, user.user.uid), {
    name: newUser.name,
    role: newUser.role.toLowerCase(),
  });
};

export { register };
