export type UserDTO = {
  id: number,
  name: string,
  last_seen_at: Date,
};

export type ConversationDTO = {
  id: number,
  name?: string | null,
  members: UserDTO[],
  last_message: string | null
};

export type ConversationCreateDTO = {
  user_ids: number[],
  name?: string,
};

export type MessageDTO = {
  id: number,
  user_id: number,
  text: string,
  sent_at: Date,
};

export type MessageCreateDTO = {
  text: string,
};