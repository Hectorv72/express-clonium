import { randomString } from '@utilities/random_string.utility';
import { Server, Socket } from 'socket.io';
import Room from './room.class';


class SocketGame {
  private _rooms : Array<Room> = [];
  private _io : Server;
  private _room_length = 5;

  constructor (io: Server) {
    this._io = io;
  }

  public findRoom (room: string) : Promise<Room | undefined> {
    return new Promise((resolve,reject) => {
      try {
        const find_room = this._rooms.find(
          (element : Room) => element.room === room
        );
        return resolve(find_room);
      } catch (error) {
        reject(error)
      }
    })
  }

  public async joinRoom (socket: Socket, room: string) {
    const exists = await this.findRoom(room);
    if(exists){
      socket.join(exists.room)
    }
  }

  public async createRoom () {
    const room_string : string = randomString(this._room_length);
    const exists = await this.findRoom(room_string) !== undefined;
    if(!exists){
      return new Room([],room_string)
    }
  }
}

export default SocketGame;
