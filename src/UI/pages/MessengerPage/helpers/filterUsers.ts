import { cloneDeep } from 'lodash';
import { userStore } from 'stores';
import { UserDTO } from 'types';

const filterUsers = (substring: string) => {
  return cloneDeep(userStore.userList).filter((user: UserDTO) => (
    user.name.includes(substring)
  ));
};

export { filterUsers };