import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );

  const channelId = user?.data?.channelId;

  useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId,
  });
  /*By default, this query would be fired off once the component mounts
   but we want it to be fired off only after the channelId has been retrieved so
   we use the 'enabled' property and set it to double-negation of channelId.
   Double-negation converts the value to a boolean which is what the 'enabled'
   property expects.
   */

  return <div>DependentQueriesPage</div>;
};

export default DependentQueriesPage;
