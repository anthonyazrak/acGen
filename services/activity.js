import { db, app } from "./firebase";
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

import {
  getStorage,
  ref,
  uploadBytes,
  uploadFile,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage(app);

// Fetch all activities created by a specific UID for landing page
const getCompletedActivitiesByUid = async (uid) => {
  try {
    const activityRef = collection(db, "activities");
    const q = query(
      activityRef,
      where("userId", "==", uid),
      where("Completed", "==", true)
    );
    const querySnapshot = await getDocs(q);

    const completedActivities = [];

    querySnapshot.forEach((doc) => {
      const {
        Title: title,
        Description: description,
        Material: materialsNeeded,
        image: image,
      } = doc.data();
      completedActivities.push({
        id: doc.id,
        title,
        description,
        materialsNeeded,
        image,
      });
    });

    return completedActivities;
  } catch (error) {
    console.error("Error fetching completed activities:", error);
    throw error;
  }
};

const getNotCompletedActivitiesByUid = async (uid) => {
  try {
    const activityRef = collection(db, "activities");
    const q = query(
      activityRef,
      where("userId", "==", uid),
      where("Completed", "==", false)
    );
    const querySnapshot = await getDocs(q);

    const notCompletedActivities = [];

    querySnapshot.forEach((doc) => {
      const {
        Title: title,
        Description: description,
        Material: materialsNeeded,
      } = doc.data();
      notCompletedActivities.push({
        id: doc.id,
        title,
        description,
        materialsNeeded,
      });
    });

    return notCompletedActivities;
  } catch (error) {
    console.error("Error fetching not completed activities:", error);
    throw error;
  }
};

// Store an acivity generated from ChatGPT API
const createActivity = async (userId, activityData) => {
  const newActivityData = {
    ...activityData,
    Completed: false, // Adding the 'Completed' field with a default value of false
  };
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

const toggleActivityCompleteness = async (activityId) => {
  try {
    // Reference to the specific activity document
    const activityDocRef = doc(db, "activities", activityId);

    // Get the current activity document
    const activityDoc = await getDoc(activityDocRef);

    if (activityDoc.exists()) {
      // Get current completeness status
      const currentStatus = activityDoc.data().Completed;

      // Update the completeness status to the opposite
      await updateDoc(activityDocRef, {
        Completed: !currentStatus
      });

      console.log(`Activity status toggled. New status: ${!currentStatus}`);
    } else {
      console.log("No such activity found!");
    }
  } catch (error) {
    console.error("Error toggling activity completeness:", error);
    throw error;
  }
};

const getActivityCompletionStatus = async (activityId) => {
  try {
    // Reference to the specific activity document
    const activityDocRef = doc(db, "activities", activityId);

    // Get the current activity document
    const activityDoc = await getDoc(activityDocRef);

    if (activityDoc.exists()) {
      // Get the completion status
      const isCompleted = activityDoc.data().Completed;
      return isCompleted;
    } else {
      console.log("No such activity found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching activity completion status:", error);
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

const markActivityAsCompleted = async (activityId) => {
  try {
    const activityRef = doc(db, "activities", activityId);
    await updateDoc(activityRef, {
      Completed: true,
    });
    console.log("Activity marked as completed:", activityId);
  } catch (error) {
    console.error("Error marking activity as completed:", error);
    throw error;
  }
};

const uploadImageToStorage = async (file, docId) => {
  try {
    // Generate a unique filename for the image
    const filename = `image_${docId}`;

    const storageRef = ref(storage, `images/` + filename + ".jpg");

    // Upload the image to Firebase Storage
    await uploadBytes(storageRef, file);

    // Get the download URL of the uploaded image
    const imageUrl = await getDownloadURL(storageRef);

    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to storage:", error);
    throw error;
  }
};

const addImageDocumentToDoc = async (docId, file) => {
  try {
    // Upload image to Firebase Storage and get download URL
    // const imageUrl = await uploadImageToStorage(file, docId);
    // Update the Firestore document with the image URL
    const docRef = doc(db, "activities", docId);
    await updateDoc(docRef, { image: file });

    console.log("Image document added to Firestore successfully");
  } catch (error) {
    console.error("Error adding image document to Firestore:", error);
    throw error;
  }
};
const updateActivityImage = async (activityId, imageUri) => {
  // Reference to the specific activity document
  try{
    const activityRef = doc(db, "activities", activityId);

  // Update the 'image' field in the document
  await updateDoc(activityRef, {
    image: imageUri
  });
  console.log("Image document added to Firestore successfully");

} catch (error) {
  console.error("Error adding image document to Firestore:", error);
  throw error;
}
};

export {
  markActivityAsCompleted,
  createActivity,
  deleteActivity,
  getCompletedActivitiesByUid,
  getNotCompletedActivitiesByUid,
  addImageDocumentToDoc,
  getActivityById,
  toggleActivityCompleteness,
  getActivityCompletionStatus,
  updateActivityImage,
  storage,
};
