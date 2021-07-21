/* eslint-disable jsx-a11y/alt-text */

import React from 'react'
import { useEffect, useState } from 'react';
import FileBase64 from 'react-file-base64';
import { createItem, getItems } from './functions';
import './App.css';

const App = () => {
   const [item, setItem] = useState({ title: '', image: '' });
   const [items, setItems] = useState([])


   const onSubmitHandler = async (e) => {
      e.preventDefault();
      const result = await createItem(item);
      setItems([...items, result]);
   }


   useEffect(() => {
      const fetchData = async () => {
         const result = await getItems();
         console.log('fetch data;m', result)
         setItems(result)
      }
      fetchData()
   }, [])


   return (
      <div className="app">
         <div className="header">
            <h1>File Upload Demo</h1>
         </div>
         {/* <div className="preformatted">
            <pre>{JSON.stringify(item, null, '\t')}</pre>
         </div> */}
         <form action="" onSubmit={onSubmitHandler}>
            <input type="text" className="input-field"
               onChange={e => setItem({ ...item, title: e.target.value })}
            />
            <FileBase64
               type="file"
               multiple={false}
               onDone={({ base64 }) => setItem({ ...item, image: base64 })}
            />
            <button className="btn">Upload</button>
         </form>

         <div className="items">
            {items?.map(item => (
               <div className="card" key={item._id}>
                  <div>
                     <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src={item.image} alt="avatar" />
                     </div>
                     <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{item.title}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

export default App
