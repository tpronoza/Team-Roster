import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getTeams } from '../../api/teamData';
import { updateMember, createMember } from '../../api/memberData';

const initialState = {
  name: '',
  position: '',
  number: '',
  memberImage: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push('/teams'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Player</h2>
      <FloatingLabel controlId="floatingInput1" label="Player Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Member Name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Member Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter URL for Player image" name="memberImage" value={formInput.memberImage} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect1" label="Team">
        <Form.Select
          aria-label="Team"
          name="teamId"
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select an Team</option>
          {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
                selected={obj.teamId === team.firebaseKey}
              >
                {team.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect2" label="Position">
        <Form.Select name="position" value={formInput.position} onChange={handleChange} className="mb-3" required>
          <option disabled value="">
            Select Player Position
          </option>
          <option value="Goalkeeper">Goalkeeper</option>
          <option value="Right Fullback">Right Fullback</option>
          <option value="Left Fullback">Left Fullback</option>
          <option value="Center Back">Center Back</option>
          <option value="Center Back (or Sweeper, if used)">Center Back (or Sweeper, if used)</option>
          <option value="Defending/Holding Midfielder">Defending/Holding Midfielder</option>
          <option value="Right Midfielder/Winger">Right Midfielder/Winger</option>
          <option value="Central/Box-to-Box Midfielder.">Central/Box-to-Box Midfielder.</option>
          <option value="Striker">Striker</option>
          <option value="Attacking Midfielder/Playmaker">Attacking Midfielder/Playmaker</option>
          <option value="Left Midfielder/Wingers">Left Midfielder/Wingers</option>
        </Form.Select>
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Player</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    number: PropTypes.string,
    active: PropTypes.bool,
    memberImage: PropTypes.string,
    firebaseKey: PropTypes.string,
    teamId: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
