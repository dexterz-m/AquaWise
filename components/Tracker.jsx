'use client'
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { MdEdit } from "react-icons/md";

const Tracker = () => {
  const { user } = useUser();

  let [dailyConsumption, setDailyConsumption] = useState(null);
  let [allConsumption, setAllConsumption] = useState(null);

  const [volume, setVolume] = useState(0);

  let [target, setTarget] = useState(3000);
  const [newTarget, setNewTarget] = useState(target);

  const [error, setError] = useState('');


  useEffect(() => {
    if (user) {
      const fetchUserGoal = async () => {

        try {
          const res = await fetch("/api/volume");

          if (res.ok) {
            const data = await res.json();
            setTarget(data.goal);
            setAllConsumption(data.total);
            setDailyConsumption(data.today)
          } else {
            console.error('Error fetching user goal');
          }

        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchUserGoal();
    }
  }, [user]);


  const contributeVolume = async () => {

    if (!user) {
      console.error('User not authenticated');
      return;
    }

    if (volume < 1 || volume > 1000) {
      setError('Warning: Value should be between 1 and 1000 ml!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const res = await fetch("/api/volume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clerkUserId: user.id, volume }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Volume contributed:', data);

      const { today, total } = data;
      setDailyConsumption(today);
      setAllConsumption(total);

    } else {
      console.error("Error occurred");
    }

  };


  const editGoal = async () => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }
  
    if (newTarget < 500 || newTarget > 5000) {
      setError('Warning: Value should be between 500 and 5000 ml!');
      setTimeout(() => setError(''), 3000);
      return;
    }
  
    document.getElementById('my_modal_2').close();
  
  
    const res = await fetch("/api/volume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ clerkUserId: user.id, target: newTarget }), // Send the newTarget as the updated goal
    });
  
    if (res.ok) {
      const data = await res.json();
      console.log('Goal updated:', data);

      const { goal, today, total } = data;
      setTarget(goal);
      setDailyConsumption(today);
      setAllConsumption(total);

    } else {
      console.error("Error occurred while updating goal");
    }
  };

  return (
    <div className='bg-tuna-900 p-5 min-h-screen flex flex-col items-center'>

      <div className='mb-10'>
        <p className='text-3xl font-bold text-black-haze-100'>Tracker</p>
      </div>

      <div className="stats flex bg-shuttle-gray-800 text-primary-content h-28 w-9/12 max-w-xl shadow-xl mt-10 mb-10 md:h-32">

        <div className="stat p-5">
          <div className="stat-title text-black-haze-100 text-center overflow-auto"><p className='text-md'>Today</p></div>

          <div className="stat-value text-anakiwa-500 text-center">
            { dailyConsumption !== null ?  <>
              <span className="text-2xl sm:text-3xl md:text-4xl">{dailyConsumption}</span>{" "}
              <span className="text-2xl sm:text-3xl md:text-4xl">ml</span></>  :  <span className='loading loading-dots'></span>}
          </div>
        </div>

        <div className="stat p-5">
          <div className="stat-title text-black-haze-100 text-center"><p className='text-md'>Total</p></div>

          <div className="stat-value text-anakiwa-500 text-center">
            { allConsumption !== null ? <>
              <span className="text-2xl sm:text-3xl md:text-4xl">{(allConsumption / 1000).toFixed(2)}</span>{" "}
              <span className="text-2xl sm:text-3xl md:text-4xl">L</span></> : <span className='loading loading-dots'></span>}
          </div>
        </div>

      </div>

      <div className=''>

        <button className="btn btn-xs text-black-haze-100 bg-transparent border-none hover:bg-transparent" onClick={() => document.getElementById('my_modal_2').showModal()}> Edit daily goal <MdEdit className='text-anakiwa-500 text-lg' /></button>

        <dialog id="my_modal_2" className="modal text-center bg-transparent">

          <div className="modal-box bg-shuttle-gray-800 flex flex-col items-center justify-center">
            <h3 className="font-bold text-lg mb-5">Edit daily consumption goal</h3>

            <div className='flex flex-row items-center justify-center'>
              <input
                type="number"
                placeholder="goal"
                className="input w-28 h-10 max-w-xs no-arrows border-none mr-5"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
              />
              <button onClick={editGoal} className="btn btn-sm h-10 bg-anakiwa-600 border-none hover:bg-anakiwa-700 text-black-haze-100">Edit</button>

            </div>

          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>

        </dialog>

      </div>

      <div className="card min-w-40 w-xl max-w-4xl">
        <p className='text-center font-extrabold text-xl mt-5 mb-5 text-black-haze-100'>Daily Progress</p>

        <div className="relative w-full">

          <progress className="progress progress-success bg-shuttle-gray-800 w-60 h-12 mt-1 shadow-xl md:w-80 lg:w-96" value={dailyConsumption} max={target}></progress>

          <span className="absolute inset-0 flex items-center justify-center text-black-haze-100 font-bold" style={{top: '50%', transform: 'translateY(-50%)'}}>
            {dailyConsumption} / {target} ml
          </span>

        </div>

      </div>

      <div className="card bg-shuttle-gray-800 min-w-sm w-4/6 max-w-md shadow-xl mt-20 mb-20 p-5 py-2">

        <div className="stat p-5">

          <div className="stat-title text-black-haze-100 text-center">Register consumption</div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2 mt-5">

            <div className="flex items-center space-x-1 my-2">
              <input type="number" placeholder="add" className="input min-w-16 w-20 md:w-24 px-4 py-1 text-sm no-arrows" value={volume} onChange={(e) => setVolume(e.target.value)} />
              <p className='text-black-haze-100 px-2 text-sm'>ml</p>
            </div>

            <select value={volume} onChange={(e) => setVolume(e.target.value)} className="select select-bordered w-48 md:w-auto max-w-60 px-4 py-1 text-sm">
              <option value={0}>Presets</option>
              <option value={200}>Plastic Cup (200 ml)</option>
              <option value={240}>Glass of water (240 ml)</option>
              <option value={500}>Water Bottle (500 ml)</option>
              <option value={750}>Sports Bottle (750 ml)</option>
            </select>

          </div>

          <button onClick={() => contributeVolume()} className="btn bg-anakiwa-600 hover:bg-anakiwa-700 text-black-haze-100 text-sm px-4 py-1 mt-5 w-full sm:w-auto">Contribute</button>

        </div>
      </div>

      {error && (
        <div role="alert" className="alert alert-warning fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded flex items-center">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current mr-2"
            fill="none"
            viewBox="0 0 24 24"
          >

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
            
          </svg>
          <span>{error}</span>

        </div>
      )}

    </div>
  );
};

export default Tracker;
