import { randomString } from '@utilities/random_string.utility';
import { Server, Socket } from 'socket.io';
import Player, { IAddPlayer } from './player.class';
import Room from './room.class';
class SocketGame {
  private _rooms : Array<Room> = [];
  private _io : Server;
  private _room_length = 10;

  constructor (io: Server) {
    this._io = io;
  }

  public get rooms () : Array<Room> {
    return this._rooms
  }

  public findRoom (room: string) : Promise<Room | undefined> {
    return new Promise((resolve,reject) => {
      try {
        const find_room = this._rooms.find(
          (element : Room) => element.room === room
        );
        return resolve(find_room);
      } catch (error) {
        reject(error);
      }
    })
  }

  public async joinRoom (socket: Socket, player: IAddPlayer, room: string) {
    const exists = await this.findRoom(room);
    if(exists){
      const new_player = new Player(player.name,player.color, socket);
      const player_added = await exists.addPlayerToRoom(new_player);
      if(player_added){
        socket.join(exists.room);
        socket.data.player = new_player;
        socket.data.room = exists;
      }
    }
  }

  public async createRoom (socket: Socket, player: IAddPlayer) {
    try {
      const room_string : string = randomString(this._room_length);
      const exists = await this.findRoom(room_string) !== undefined;
      if(!exists){
        const host = new Player(player.name,player.color, socket);
        const room = new Room(host,[host],room_string);
        this._rooms.push(room)
        socket.data.player = host;
        socket.data.room = room;
        return true
      }
      return false
    } catch (error) {
      throw error;
    }
    
  }
}

export default SocketGame;
