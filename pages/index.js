import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import Item from "../components/item";
import Modal from "../components/modal";

export default function Home() {
  const [qty, setQty] = useState(["", ""]); // qty is a misnomer, holds the values of the inputs
  const [showModal, setShowModal] = useState(false); // controls the message modal
  const [msg, setMsg] = useState({}); // content for message in modal

  // wrapper for async axios call
  const handleCalc = () => {
    const getData = async () => {
      let messageData = {};

      try {
        let res = await axios.post("/api/calculate", {
          stops: qty,
        });

        // msg content depending on whether api call is successful
        if (res.data.invalid) {
          messageData.header = "Whoops, something went wrong!";
          messageData.body = res.data.invalid.length
            ? `It looks like some of your zipcodes are invalid: \n${res.data.invalid}`
            : "Not enough zipcodes!";
        } else {
          messageData.header = "Here is your distance!";
          messageData.body = `The total distance between your zipcodes is ${res.data.totalDistance.toFixed(
            2
          )} miles.`;
        }

        // display modal
        setMsg(messageData);
        setShowModal(true);
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  };

  /*
   * Handlers
   */
  const handleAdd = () => {
    setQty([...qty, ""]);
  };

  const handleRemove = (event) => {
    let tmp = qty;

    tmp.splice(event.target.name, 1);

    setQty([...tmp]);
  };

  const handleType = (event) => {
    let tmp = qty;

    tmp[event.target.name] = event.target.value;

    setQty([...tmp]);
  };

  return (
    <div className="flex flex-col overflow-auto items-center justify-center h-screen py-2">
      <Head>
        <title>Haversine Shenanigans</title>
      </Head>

      {/*Modal for success/error message */}
      <Modal open={showModal} click={() => setShowModal(false)} content={msg} />

      <div className="flex-grow p-10 m-4">
        <div
          className="rounded-xl bg-blue-100 border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >
          <p className="font-bold">Hey there!</p>
          <p className="text-sm">
            Enter some zipcodes here and see how far apart they are!
          </p>
        </div>

        <form className="bg-white flex-grow shadow-md rounded-xl px-8 pt-6 pb-8 mt-30 mb-4">
          {/*Input fields*/}
          {qty.map((val, index) => {
            return (
              <Item
                remove={handleRemove}
                change={handleType}
                key={index + 1}
                value={val}
                num={index}
              />
            );
          })}
          <div className="flex items-center justify-between">
            <button
              onClick={handleAdd}
              className="bg-green-500 hover: bg-green-700 text-white font-bold m-4 p-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
            >
              + Add Location
            </button>

            <button
              onClick={handleCalc}
              className="bg-blue-500 hover:bg-blue-700 text-white  font-bold p-4 m-4 rounded-full absolute bottom-10 right-10 focus:outline-none focus:shadow-outline"
              type="button"
            >
              Calculate!
            </button>
          </div>
        </form>
      </div>

      <footer className="items-center justify-center sticky absolute bottom-0 w-full max-h-24 border-t mt-10 px-20 py-2">
        Woot! Mark Murphy
      </footer>
    </div>
  );
}
