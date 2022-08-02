import React from 'react';
import { useRouter } from 'next/router';

export default function ViewMember() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  // console.warn(firebaseKey);
  return (
    <div>View Member {firebaseKey}</div>
  );
}
