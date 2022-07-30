/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

export default function User(
  {
    name, email, image, lastLogin,
  },
) {
  return (
    <>
      <div>User</div>
      <div>name: {name}</div>
      <div>email: {email}</div>
      <div>image: <img src={image} alt={name} /></div>
      <div>lastLogin: {lastLogin}</div>
    </>
  );
}

User.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  lastLogin: PropTypes.string,
};

User.defaultProps = {
  name: 'Creators Name',
  email: 'blah@blah.com',
  image: 'https://www.millcitypress.net/wp-content/uploads/2018/08/author-bios.jpg',
  lastLogin: '01/1/1900 4:00:00',
};
