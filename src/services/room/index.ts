import { api } from '@/core/base.service';
import { RoomCreateType } from '@/core/types/room';

const RoomService = {
  getRoomsByUser: async () => {
    const { data } = await api.get('/room');
    return data.data;
  },
  getRoomByRoomUniqueId: async (roomUniqueId: string) => {
    const { data } = await api.get(`/room/${roomUniqueId}`);
    return data.data;
  },
  createRoom: async (formData: RoomCreateType) => {
    const data = await api.post('/room', formData);
    return data;
  },
};

export default RoomService;
