import { api } from '@/core/base.service';
import { MessageListCreateType, MessageType } from '@/core/types/message';

const MessageService = {
  getMessages: async (roomUniqueId: string): Promise<MessageType[]> => {
    const { data } = await api.get(`/room/${roomUniqueId}/message`);
    return data.data;
  },
  createMessage: async (formData: MessageListCreateType) => {
    const data = await api.post('/message', formData);
    return data;
  },
};

export default MessageService;
