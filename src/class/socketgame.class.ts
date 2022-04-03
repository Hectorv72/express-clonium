import { create_player, create_room } from '@listeners/list';
import { createRoom } from '@listeners/receivers';
import { createPlayer } from '@listeners/receivers/create_player';
import { randomString } from '@utilities/random_string.utility';
import { Server, Socket } from 'socket.io';
import Player, { IPlayer } from './player.class';
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

  public async joinRoom (socket: Socket, room: string) {
    try {
      const room_find = await this.findRoom(room);
      if(room_find){
        const player = socket.data.player;
        const { name } = player;
        const player_inroom = await room_find.findPlayerInRoom(name);
        if(!player_inroom){
          const player_added = await room_find.addPlayerToRoom(player);
          if(player_added){
            socket.join(room_find.room);
            socket.data.room = room_find;
            return room_find
          }
        } else {
          throw new Error('El usuario ya está en la room')
        }
      } else {
        throw new Error('La sala no existe')
      }
    } catch (error) {
      throw error
    }
    
  }

  public async createRoom (socket: Socket) : Promise<string | undefined> {
    try {
      const room_string : string = randomString(this._room_length);
      const exists = await this.findRoom(room_string) !== undefined;

      if(!exists){
        const player : Player = socket.data.player
        if(player){
          const room = new Room(player,[player],room_string);
          this._rooms.push(room)

          socket.join(room.room);
          socket.data.room = room;
          return room_string;
        }
      }

      throw new Error('No se cumplieron las condiciones');
    } catch (error) {
      throw error
    }
  }

  public createPlayer (socket : Socket,name : string) {
    const player = new Player(socket,name);
    socket.data.player = player;
  }

  private onConnection(socket : Socket){
    console.log('usuario conectado => ',socket.id)
    const address = socket.handshake.address;
    console.log('ip =>',address)
    // listeners
    socket.on(create_room, () => createRoom(socket))
    socket.on(create_player,(name) => createPlayer(socket,name))
  }

  private listenConnections(){
    this._io.on('connection',this.onConnection)
  }
}

export default SocketGame;
