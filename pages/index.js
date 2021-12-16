import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Item from '../components/item';
import Modal from '../components/modal';

export default function Home() {

  const [qty, setQty] = useState(['', '']);
  const [showModal, setShowModal] = useState(false);

  const handleCalc = () => {

    const getData = async () => {

      try{
      let res = await axios.post('/api/calculate', {
        stops: qty
      });
      console.log(res.data);

      setShowModal(true)

      }catch(e){
        console.error(e);
      }
    }

    getData()
  }

  const handleAdd = () => {
    setQty([...qty, '']);
  }

  const handleRemove = () => {
    let tmp = qty;
    tmp.pop();
    setQty([...tmp])
  }

  const handleType = (event) => {
    let tmp = qty;

    tmp[event.target.name] = event.target.value;

    setQty([...tmp])
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen py-2">
      <Head>
        <title>Haversine Shenanigans</title>
      </Head>

      <Modal open={showModal} click={() => setShowModal(false)} />


    <div className="flex-grow overflow-auto">

    <div className="rounded-xl bg-blue-100 border-blue-500 text-blue-700 px-4 py-3" role="alert">
      <p className="font-bold">Hey there!</p>
      <p className="text-sm">Enter some zipcodes here and see how far apart they are!</p>
    </div>

      <form className="bg-white flex-grow shadow-md rounded-xl px-8 pt-6 pb-8 mt-30 mb-4">
    
    {qty.map((val, index) => {
      return <Item change={handleType} key={index + 1} value={val} num={index} />
    })}
    <div className="flex items-center justify-between absolute bottom-10 right-10">
      
      <button onClick={handleAdd} className="bg-green-500 hover: bg-green-700 text-white font-bold m-4 p-4 rounded-full focus:outline-none focus:shadow-outline" type="button">
        + Add Location
      </button>
      {qty.length >= 3 ?
      <button onClick={qty.length >= 3 ? handleRemove : null} className="bg-red-500 hover: bg-red-700 text-white font-bold m-4 p-4 rounded-full focus:outline-none focus:shadow-outline" type="button">
        - Remove Location
      </button>
      : <button className="bg-red-100 hover: bg-red-200 text-white font-bold p-4 m-4 rounded-full focus:outline-none focus:shadow-outline cursor-not-allowed" type="button">
      - Remove Location
    </button>
    }
      <button onClick={handleCalc} className="bg-blue-500 hover:bg-blue-700 text-white  font-bold p-4 m-4 rounded-full focus:outline-none focus:shadow-outline" type="button">
        Calculate!
      </button>


    </div>
    
  </form>
      
      

      </div>
      
      <footer className="items-center justify-center w-full max-h-24 border-t px-20 py-2">
       Woot! Mark Murphy
      </footer>
    </div>
  )
}
