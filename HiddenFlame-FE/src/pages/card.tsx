import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface MatchCardProps {
  username: string;
  country: string;
  state: string;
  city: string;
  onSendRequest?: () => void;
  onViewProfile?: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ username, country, state, city, onSendRequest, onViewProfile }) => {
  return (
    <div className="w-80 p-6 bg-background-900 rounded-2xl shadow-md">
      <div className="flex justify-center mb-4">
        <FaUserCircle className="text-7xl text-primary-500" />
      </div>
      <h3 className="text-2xl font-bold text-text-400 text-center">{username}</h3>
      <p className="text-text-500 text-center mt-2">{country}, {state}, {city}</p>
      <div className="flex justify-around mt-6">
        <button onClick={onSendRequest} className="bg-primary-500 text-white py-2 px-6 rounded-full">Send Request</button>
        <button onClick={onViewProfile} className="bg-secondary-500 text-white py-2 px-6 rounded-full">View Profile</button>
      </div>
    </div>
  );
};

export default MatchCard;