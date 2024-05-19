import { db } from "./config";
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

async function getUser(id) {
  const q = query(collection(db, "user"), where("uid", "==", id));
  const dataSnap = await getDocs(q);
  const userId = dataSnap.docs[0].data().uid;
  localStorage.setItem("userId", JSON.stringify({ uid: userId }));
  return userId;
}

export { getUser };
