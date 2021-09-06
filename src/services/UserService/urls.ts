const BASE_URL = process.env.REACT_APP_BASE_URL;

const USER_LIST_URL = `${BASE_URL}/user`;
const USER_URL = (userId: string) => `${USER_LIST_URL}/${userId}`;

export {
  USER_LIST_URL,
  USER_URL,
};