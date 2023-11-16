import { db } from "./firebase";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  doc,
  deleteDoc,
  addDoc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";

// Fetch all activities created by a specific UID for landing page
const getActivitiesByUid = async (uid) => {
  try {
    const activityRef = collection(db, "activities");
    const q = query(activityRef, where("userId", "==", uid));
    const querySnapshot = await getDocs(q);

    const activities = [];

    querySnapshot.forEach((doc) => {
      // Destructure the data from doc.data() and rename fields as needed
      const { Title: title, Description: description, Material: materialsNeeded } = doc.data();

      // Push the activity in the desired format
      activities.push({
        id: doc.id, // Firestore document ID
        title,
        description,
        materialsNeeded,
      });
    });

    return activities;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

// Store an acivity generated from ChatGPT API
const createActivity = async (userId, activityData) => {
  const newActivityData = { ...activityData };

  try {
    // Create the activity document in Firestore
    const docRef = await addDoc(collection(db, "activities"), {
      userId,
      ...newActivityData,
    });

    return docRef.id;
  } catch (error) {
    console.error("Error storing activity:", error);
    throw error;
  }
};

// Delete an activity by its ID
const deleteActivity = async (activityId) => {
  try {
    const activityRef = doc(db, "activities", activityId);
    await deleteDoc(activityRef);
  } catch (error) {
    console.error("Error deleting activity:", error);
    throw error;
  }
};

const getActivityById = async (activityId) => {
  try {
    const docRef = doc(db, "activities", activityId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists) {
      // document does not exist
      return null;
    } else {
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (error) {
    console.error("Error fetching activity:", error);
    throw error;
  }
};

export { createActivity, deleteActivity, getActivitiesByUid, getActivityById };
