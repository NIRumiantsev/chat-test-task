import { ReactComponentElement } from 'react';
import moment from 'moment';
import { Avatar } from 'UI';

import './ConversationBadge.scss';

type ConversationBadgeProps = {
  title: string,
  currentId: number,
  onClick: () => void,
  content?: string,
  lastMessageTime?: Date,
};

const ConversationBadge = (props: ConversationBadgeProps): ReactComponentElement<'div'> => {
  const {
    title,
    currentId,
    onClick,
    content = '',
    lastMessageTime,
  } = props;

  return (
    <div
      className="ConversationBadge"
      onClick={onClick}
    >
      <Avatar
        content={title}
        currentId={currentId}
      />
      <div className="ConversationBadge_content">
        <div className="ConversationBadge_holder">
          <h3 className="ConversationBadge_title">{title}</h3>
          {lastMessageTime && (
            <div className="ConversationBadge_timestamp">
              {moment(lastMessageTime).fromNow()}
            </div>
          )}
        </div>
        <p className="ConversationBadge_text">{content}</p>
      </div>
    </div>
  )
};

export { ConversationBadge };