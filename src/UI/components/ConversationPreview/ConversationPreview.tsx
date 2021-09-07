type ConversationPreviewType = {
  conversationName: string,
  onClick: () => void,
}

const ConversationPreview = (props: ConversationPreviewType) => {
  const {
    conversationName,
    onClick
  } = props;

  return (
    <div onClick={onClick}>
      {conversationName}
    </div>
  );
};

export { ConversationPreview };