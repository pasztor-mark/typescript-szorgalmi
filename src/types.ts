export type Track = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  duration: number; // másodperc
  liked: boolean;
};

export type Playlist = {
  id: string;
  name: string;
  trackIds: string[];
  createdAt: string;
};

export type DB = {
  tracks: Track[];
  playlists: Playlist[];
};
