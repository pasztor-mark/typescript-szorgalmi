import type { DB, Playlist, Track } from "./types.ts";
export const db : DB = {
  tracks: [] as Track[],
  playlists: [] as Playlist[]
};

const out = document.getElementById("output") as HTMLPreElement;

function write(msg: string) {
  out.textContent = msg;
}


export function listTracks() {
  
}
export function addTrack(track) {
}

export function addToPlaylist(pid, tid) {
}

export function removeFromPlaylist(pid, tid) {
}
export function searchTracks(q) {
}

export function likeTrack(id) {
}

export function unlikeTrack(id) {
}
export function createPlaylist(name): Playlist {
}
export function deleteTrack(id) {
}
export function listPlaylists() {
}
export function listPlaylistTracks(id) {
}

export function exportData(): string {
}
export function importData(obj: DB) {
}