import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { deleteSingleMember } from './memberData';

const dbUrl = clientCredentials.databaseURL;

const getTeams = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const createTeam = (teamObj, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/teams.json`, teamObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/teams/${response.data.name}.json`, payload).then(() => {
        getTeams(uid).then(resolve);
      });
    }).catch(reject);
});

const deleteSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/teams/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateTeam = (teamObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/teams/${teamObj.firebaseKey}.json`, teamObj)
    .then(resolve)
    .catch(reject);
});

const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getTeamMembers = (teamFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/members.json?orderBy="team"&equalTo="${teamFirebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamMembers(teamFirebaseKey)])
    .then(([teamObject, teamMembersArray]) => {
      resolve({ ...teamObject, members: teamMembersArray });
    }).catch((error) => reject(error));
});

const deleteTeamAndMembers = (teamFirebaseKey) => new Promise((resolve, reject) => {
  getTeamMembers(teamFirebaseKey).then((membersArray) => {
    const deleteTeamPromises = membersArray.map((member) => deleteSingleMember(member.firebaseKey));

    Promise.all(deleteTeamPromises).then(() => {
      deleteSingleMember(teamFirebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  getTeams,
  deleteSingleTeam,
  getSingleTeam,
  viewTeamDetails,
  createTeam,
  updateTeam,
  deleteSingleMember,
  deleteTeamAndMembers,
};
