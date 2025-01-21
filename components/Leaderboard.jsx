'use client'

import React,{ useEffect, useState } from 'react'

const Leaderboard = () => {

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setLeaderboard(data);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);


  return (
    <div className='bg-tuna-900 text-black-haze-100 p-5 h-auto flex flex-col items-center'>
        <div className='mb-20'>
            <p className='text-3xl font-bold'>Leaderboard</p>
        </div>

        <div className="card mb-44 h-auto max-w-xl bg-shuttle-gray-800 shadow-xl">
          <div className="card-body">

            <div className="overflow-x-auto">
              <table className="table text-center text-sm">
                {/* head */}
                <thead>
                  <tr className='text-anakiwa-500 text-md'>
                    <th>Nr.</th>
                    <th>User</th>
                    <th>Drinked Water (L)</th>
                  </tr>
                </thead>

                <tbody>

                  {Array.isArray(leaderboard) ? (
                  leaderboard.map((user, index) => (
                    <tr key={user.username} className={`text-${index === 0 ? 'yellow-400' : 'slate-500'}`}>
                      <th>{index + 1}</th>
                      <td>{user.username}</td>
                      <td>{user.totalWater}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No data available</td>
                  </tr>
                )}

                </tbody>
                
              </table>
            </div>

          </div>

        </div>

        

    </div>
  )
}

export default Leaderboard