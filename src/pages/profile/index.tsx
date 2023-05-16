import React, { useEffect, useState } from 'react';
import { api } from '@/components/Layouts/BaseLayout';
import { useRouter } from 'next/router';
import { USER_API } from '@/common/environments';

function Profile(props: any) {
  const [profile, setProfile] = useState<any>(undefined);
  const router = useRouter();

  const onLogoutHandler = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/login');
  };

  useEffect(() => {
    async function fetchMyProfile() {
      const myProfile = await api.get(USER_API.FIND_ME);
      if (profile === undefined) {
        setProfile(myProfile.data.data);
      }
    }
    fetchMyProfile();
  }, [profile]);

  return (
    <div className="container">
      <div>
        {profile?.username} <br />
        {profile?.nickname} <br />
        {profile?.email} <br />
      </div>
      <button className="btn btn-primary btn-md en" onClick={onLogoutHandler}>
        LOGOUT
      </button>
    </div>
  );
}

export default Profile;

// export async function getStaticProps() {
//   const myProfile = await api.get(USER_API.FIND_ME);
//   console.log(myProfile);
//   return {
//     props: {
//       myProfile: myProfile.data.data,
//     },
//   };
// }
