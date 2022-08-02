import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createMember = (memberObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/members.json`, memberObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/members/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const getSingleMember = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/members/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getMembers = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/members.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const updateMember = (memberObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/members/${memberObj.firebaseKey}.json`, memberObj)
    .then(() => getMembers(memberObj))
    .then(resolve)
    .catch(reject);
});

const deleteSingleMember = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/members/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const viewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleMember(memberFirebaseKey)])
    .then(([memberObj]) => {
      resolve({ memberObj });
    }).catch((error) => reject(error));
});

export {
  deleteSingleMember,
  createMember,
  updateMember,
  getSingleMember,
  getMembers,
  viewMemberDetails,
};
