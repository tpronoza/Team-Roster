import { React, useState, useEffect } from 'react';
import { getTeams } from '../api/teamData';
import TeamCard from '../components/TeamCard';
import { useAuth } from '../utils/context/authContext';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]);

  return (
    <div className="d-flex flex-wrap">
      {teams.map((teamObj) => (
        <TeamCard key={teamObj.firebaseKey} teamObj={teamObj} onUpdate={getAllTeams} />
      ))}
    </div>
  );
}
