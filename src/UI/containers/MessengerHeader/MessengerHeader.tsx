import { Button } from 'UI';

type MessengerHeaderProps = {
  onStartConversation: () => void;
  onStartGroupChart: () => void;
};

const MessengerHeader = (props: MessengerHeaderProps) => {
  const {
    onStartConversation,
    onStartGroupChart,
  } = props;

  return (
    <div>
      Header
      <Button content="Start dialog" onClick={() => onStartConversation()}/>
      <Button content="Create group chat" onClick={() => onStartGroupChart()}/>
    </div>
  )
};

export { MessengerHeader };