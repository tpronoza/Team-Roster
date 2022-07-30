import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MemberForm from '../../components/forms/MemberForm';
import { getSingleTeam } from '../../api/teamData';

export default function NewTeam() {
  const [newTeam, setNewTeam] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setNewTeam);
  }, [firebaseKey]);

  return <MemberForm teamFirebaseKey={newTeam.firebaseKey} />;
}
