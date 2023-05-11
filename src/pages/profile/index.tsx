import React from 'react';
import { api } from '@/components/Layouts/BaseLayout';
import { useRouter } from 'next/router';
import { USER_API } from '@/common/environments';

function Profile(props: any) {
  const router = useRouter();

  const onLogoutHandler = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/login');
  };

  return (
    <div className="container">
      {props.myProfile.email}
      <button className="btn btn-primary btn-md en" onClick={onLogoutHandler}>
        LOGOUT
      </button>
    </div>
  );
}

export default Profile;

export async function getStaticProps() {
  const myProfile = await api.get(USER_API.FIND_ME);

  console.log(myProfile);

  return {
    props: {
      myProfile: myProfile.data.data,
    },
  };
}
