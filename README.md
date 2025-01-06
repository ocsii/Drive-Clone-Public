# Google Drive Clone  

This is a Google Drive Clone.  


## Firebase Configuration  

Before running the project, you need to set up Firebase configuration:  

1. Create a `firebase.js` file in the `src/` directory.  
2. Add your Firebase API key and configuration to the `firebase.js` file. Use the format below as a reference:  

   ```javascript  
   // src/firebase.js  
   import { initializeApp } from "firebase/app";
   import { getFirestore, serverTimestamp } from 'firebase/firestore'; // Import serverTimestamp here
   import { getAuth, GoogleAuthProvider } from 'firebase/auth';
   import { getStorage } from 'firebase/storage';

   const firebaseConfig = {  
       apiKey: "YOUR_API_KEY",  
       authDomain: "YOUR_AUTH_DOMAIN",  
       projectId: "YOUR_PROJECT_ID",  
       storageBucket: "YOUR_STORAGE_BUCKET",  
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  
       appId: "YOUR_APP_ID"  
   };  

   const app = initializeApp(firebaseConfig);

   const db = getFirestore(app);
   const auth = getAuth(app);
   const provider = new GoogleAuthProvider();
   const storage = getStorage(app);
   
   export { auth, provider, storage, db, serverTimestamp }; 
   ```  

   Replace the placeholder values (`YOUR_API_KEY`, etc.) with your actual Firebase project credentials.  

3. If you don't have the Firebase configuration, ask me for the configuration file.

---  

## How to Run the Project  

1. In the root directory, install the dependencies:  
   ```bash  
   npm install  
   ```  

2. Start the development server:  
   ```bash  
   npm start  
   ```  

---  
