import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { getSingleMember } from '../api/memberData';

export default function MemberViewCard({ memberObj }) {
  getSingleMember(memberObj.firebaseKey);
  return (
    <Card style={{ width: '18rem', margin: '5px' }}>
      <Card.Body>
        <div>Name: {memberObj.name}</div>
        <div>Position: {memberObj.position}</div>
        {/* <div>Number: {memberObj.number}</div> */}
        <Card.Img variant="top" src={memberObj.memberImage} alt={memberObj.name} style={{ height: '200px' }} />
      </Card.Body>
    </Card>
  );
}

MemberViewCard.propTypes = {
  memberObj: PropTypes.shape({
    memberImage: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    // number: PropTypes.string,
    // team: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
