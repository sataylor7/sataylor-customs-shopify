import React from 'react';
import { useRouter } from 'next/router';

export default function Activate() {
  const router = useRouter();
  const { userID, activateID } = router.query;

  return (
    <div>
      <p>user id: {userID}</p>
      <p> activate id: {activateID}</p>
    </div>
  );
}
