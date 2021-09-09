import { ReactComponentElement } from 'react';

import './UserItem.scss';
import {Avatar, Checkbox} from "../../../../components";
import {UserDTO} from "../../../../../types";

type UserItemProps = {
  userData: UserDTO,
  onClick?: () => void,
  withCheckbox?: boolean,
  onCheck?: (value: boolean) => void,
  checked?: boolean,
};

const UserItem = (props: UserItemProps): ReactComponentElement<'div'> => {
  const {
    userData,
    onClick= () => {},
    onCheck = () => {},
    withCheckbox = false,
    checked = false,
  } = props;

  return (
    <div className="UserItem">
      <div className="UserItem_holder">
        <Avatar
          content={userData.name}
          currentId={userData.id}
        />
        <h3 className="UserItem_name">{userData.name}</h3>
      </div>
      {
        withCheckbox ? (
          <Checkbox
            value={checked}
            onChange={onCheck}
          />
        ) : (
          <span
            onClick={onClick}
            className="UserItem_start"
          >
            Start chatting!
          </span>
        )
      }
    </div>
  )
};

export { UserItem };