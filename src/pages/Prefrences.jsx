import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import "firebase/database";
import { collection, query, onSnapshot, getDocs } from 'firebase/firestore';
const Prefrences = () => {
  const userId = 's48rdKPmfuUcQLBxHpnP91U6MG02';
const dite_preferences = 'dite_preferences';
  const userCollectionRef = collection(db, 'Users',userId,dite_preferences);
  const [preferences, setPreferences] = useState([]);
  const [preferencescount, setPreferencescount] = useState([]);
  const fetchUser = async () => {
    const querySnapshot = await getDocs(userCollectionRef);
    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(data, "pref")
    setPreferences(data);
    const dataLength = querySnapshot.size;
    setPreferencescount(dataLength)
  }


  useEffect(() => {
    fetchUser();

  }, []);
  return (
    <div>

<h1 className="my-5 font-semibold text-3xl" >Preferences</h1>
      <h2 className="mb-4 font-medium text-xl ml-3" style={{ color: "#737373" }}> Total Preferences: {preferencescount}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {preferences.map((preference, i) => (
     <p className="my-5 text-center mx-5 rounded-lg" style={{backgroundColor:"white"}}>  <p className=' py-5 font-medium text-base' >{preference.name}</p></p>
        ))}
      </div>


    </div>
  )
}

export default Prefrences