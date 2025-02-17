import React from "react";

const games = [
  {
    id: 1,
    team1: "Real Madrid",
    team2: "Man City",
    odds: { team1: 1.85, draw: 3.2, team2: 2.1 },
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    team1: "Barcelona",
    team2: "Liverpool",
    odds: { team1: 2.05, draw: 3.0, team2: 1.95 },
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    team1: "Bayern Munich",
    team2: "PSG",
    odds: { team1: 1.75, draw: 3.5, team2: 2.25 },
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    team1: "Bayern Munich",
    team2: "PSG",
    odds: { team1: 1.75, draw: 3.5, team2: 2.25 },
    image: "https://via.placeholder.com/150",
  }, {
    id: 5,
    team1: "Bayern Munich",
    team2: "PSG",
    odds: { team1: 1.75, draw: 3.5, team2: 2.25 },
    image: "https://via.placeholder.com/150",
  }, {
    id: 6,
    team1: "Bayern Munich",
    team2: "PSG",
    odds: { team1: 1.75, draw: 3.5, team2: 2.25 },
    image: "https://via.placeholder.com/150",
  },
];

export default function GameList() {
  return (
    <div className="p-2 sm:p-4 bg-gray-100 min-h-screen">
    <h2 className="text-lg sm:text-xl font-semibold sm:font-bold mb-4 text-center">
      Live Games
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {games.map((game) => (
        <div
          key={game.id}
          className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <img
            src={game.image}
            alt={`${game.team1} vs ${game.team2}`}
            className="w-full h-28 sm:h-32 object-cover rounded-lg"
          />
          <div className="mt-2 sm:mt-3">
            <h3 className="font-medium sm:font-semibold text-base sm:text-lg">
              {game.team1} vs {game.team2}
            </h3>
            <div className="flex justify-between mt-2 space-x-1 sm:space-x-2">
              <button className="bg-blue-500 text-white py-1 px-2 sm:px-3 rounded-md hover:bg-blue-600 text-xs sm:text-sm">
                {game.odds.team1}
              </button>
              <button className="bg-gray-300 py-1 px-2 sm:px-3 rounded-md hover:bg-gray-400 text-xs sm:text-sm">
                {game.odds.draw}
              </button>
              <button className="bg-green-500 text-white py-1 px-2 sm:px-3 rounded-md hover:bg-green-600 text-xs sm:text-sm">
                {game.odds.team2}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
}
