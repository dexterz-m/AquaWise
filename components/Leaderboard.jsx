import React from 'react'

const Leaderboard = () => {
  return (
    <div className='bg-tuna-900 text-black-haze-100 p-5 h-auto flex flex-col items-center'>
        <div className='mb-20'>
            <p className='text-3xl font-bold'>Leaderboard</p>
        </div>

        <div className="card w-2/3 mb-44 h-auto max-w-xl bg-shuttle-gray-800 shadow-xl">
          <div className="card-body">

            <div className="overflow-x-auto">
              <table className="table text-center md:text-sm xs:text-xs sm:text-xs">
                {/* head */}
                <thead>
                  <tr className='text-anakiwa-500 text-md'>
                    <th>Nr.</th>
                    <th>User</th>
                    <th>Drinked Water (L)</th>
                  </tr>
                </thead>

                <tbody>

                  <tr className="text-yellow-400">
                    <th>1</th>
                    <td>User 1</td>
                    <td>284.7</td>
                  </tr>

                  <tr className="text-slate-500">
                    <th>2</th>
                    <td>User 2</td>
                    <td>154.2</td>
                  </tr>

                  <tr className="text-amber-600">
                    <th>3</th>
                    <td>User 3</td>
                    <td>128.9</td>
                  </tr>

                  <tr className="hover">
                    <th>4</th>
                    <td>User 4</td>
                    <td>115.2</td>
                  </tr>

                  <tr className="hover">
                    <th>5</th>
                    <td>User 5</td>
                    <td>111.4</td>
                  </tr>

                  <tr className="hover">
                    <th>6</th>
                    <td>User 6</td>
                    <td>111.4</td>
                  </tr>

                  <tr className="hover">
                    <th>7</th>
                    <td>User 7</td>
                    <td>111.4</td>
                  </tr>

                  <tr>
                    <th>8</th>
                    <td>User 8</td>
                    <td>111.4</td>
                  </tr>

                  <tr className="hover">
                    <th>9</th>
                    <td>User 9</td>
                    <td>111.4</td>
                  </tr>

                  <tr className="hover">
                    <th>10</th>
                    <td>User 10</td>
                    <td>111.4</td>
                  </tr>

                </tbody>
                
              </table>
            </div>

          </div>

        </div>

        

    </div>
  )
}

export default Leaderboard