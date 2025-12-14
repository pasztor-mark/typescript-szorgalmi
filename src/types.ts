export type Track = {
  id: ;
  title: ;
  artist: ;
  album?: ;
  genre?: ;
  duration: ; // másodperc
  liked: ;
};

export type Playlist = {
  id: ;
  name: ;
  trackIds: ;
  createdAt: ;
};

export type DB = {
  tracks: Track[];
  playlists: Playlist[];
};
