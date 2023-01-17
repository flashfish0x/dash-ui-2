// import React from 'react'
// import {collection, addDoc} from "firebase/firestore"
// import { fireDB } from '@/firebase/firebaseApp'
// import {useCollection} from "react-firebase-hooks/firestore"


// function firestoreTest() {

//     const [votes, votesLoading, votesError] = useCollection(
//         collection(fireDB, "test"),
//         {}
//       );
    
//       const saveNote = async () => {
//         await addDoc(collection(fireDB, "test"), {setted: rue});
//       }
    
    
//       if(!votesLoading && votes) {
        
//         votes.docs.map((doc) => console.log(doc.data()));
//       }
//       if(!votesLoading){
//         console.log(fireDB);
//       }
//   return (
//     <div><button onClick={saveNote}
//     >
//     Save Note
//   </button></div>
//   )
// }

// export default firestoreTest