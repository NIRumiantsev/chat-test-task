import { ReactComponentElement } from 'react';
import { avatarColors } from './mock';

import './Avatar.scss';

export type AvatarProps = {
  content: string;
  currentId: number;
  size?: 'l' | 'm';
};

const Avatar = (props: AvatarProps): ReactComponentElement<'div'> => {
  const {
    content,
    currentId,
    size = 'l',
  } = props;

  //Supposed to solve avatar colors case with scss random, but then we will unable to save the strict user color.
  //So this strange function generates a permanent avatar color basing on user/conversation id.
  //Maybe we could add an avatar property to our users/conversations API
  const getUserColor = () => {
    const colorIndex: string = currentId?.toString()?.split('')?.reverse()[0];
    if (colorIndex) {
      return avatarColors[Number(colorIndex)];
    } else {
      return avatarColors[0];
    }
  };

  return (
    <div
      role="avatar"
      className={`Avatar--${size}`}
      style={{background: getUserColor()}}
    >
      {content[0]}
    </div>
  )
};

export { Avatar };