import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleMember } from '../api/memberData';

function MemberCard({ memberObj, onUpdate }) {
  const deleteMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteSingleMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img className="MemberImage" variant="top" src={memberObj.memberImage} alt={memberObj.name} style={{ height: '250px' }} />
      <Card.Body>
        <Card.Title>{memberObj.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{memberObj.position}</Card.Subtitle>
        <div className="teamButtons">
          <Link href={`/member/${memberObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
          <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteMember} className="m-2">DELETE</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    memberImage: PropTypes.string,
    active: PropTypes.bool,
    firebaseKey: PropTypes.string,
    teamId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MemberCard;
