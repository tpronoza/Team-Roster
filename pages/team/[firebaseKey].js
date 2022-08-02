import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MemberCard from '../../components/MemberCard';
import { getSingleTeam } from '../../api/teamData';

export default function ViewTeam() {
  const [viewTeam, setViewTeam] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setViewTeam);
  }, [firebaseKey]);

  return (
    <div className="team-details">
      <div className="text-white ms-5 details">
        <h5>TEAM PLAYERS</h5>
        <hr />
      </div>
      {viewTeam.players?.map((player) => (
        <MemberCard key={player.firebaseKey} playerObj={player} onUpdate={setViewTeam} />
      ))}
    </div>
  );
}
