import { create_room } from '@listeners/list';
import { createRoom } from '@listeners/receivers';
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
    this.listenConnections();
  }

  public get rooms () : Array<Room> {
    return this._rooms;
  }

  public get io () : Server {
    return this._io;
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
    try {
      const exists = await this.findRoom(room);
      if(exists){
        const { name, color } = player;
        const exists_player = exists.findPlayerInRoom(name)
        if(name && color){
          const new_player = new Player(player.name,player.color, socket);
          const player_added = await exists.addPlayerToRoom(new_player);
          if(player_added){
            socket.join(exists.room);
            socket.data.room = exists;
          }
        } else {
          throw new Error('El usuario no tiene datos suficientes')
        }
      } else {
        throw new Error('La sala no existe')
      }
    } catch (error) {
      throw error
    }
    
  }

  public async createRoom (socket: Socket, player: IAddPlayer) : Promise<string | undefined> {
    try {
      const room_string : string = randomString(this._room_length);
      const exists = await this.findRoom(room_string) !== undefined;
      if(!exists){
        const { name, color } = player
        if(name && color){
          const host = new Player(name,color, socket);
          const room = new Room(host,[host],room_string);
          this._rooms.push(room)
          socket.data.room = room;
          return room_string;
        } else {
          throw new Error('El usuario no tiene datos suficientes')
        }
      }
    } catch (error) {
      throw error
    }
  }

  private onConnection(socket : Socket){
    console.log('usuario conectado => ',socket.id)
    const address = socket.handshake.address;
    console.log('ip =>',address)
    socket.on(create_room, (player : IAddPlayer) => createRoom(socket,player))
  }

  private listenConnections(){
    this._io.on('connection',this.onConnection)
  }
}

export default SocketGame;
