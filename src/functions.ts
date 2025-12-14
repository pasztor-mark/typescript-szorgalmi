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
  let content = "";
  if (db.tracks.length === 0){
    content = ("Nincs még zeneszám.\n");
  } 
  else {
    content = "Zeneszámok:" + db.tracks.map((t) => {
      
      return `${t.id}. ${t.title} — ${t.artist} | ${t.album ?? "-"} | ${t.genre ?? "-"} | ${t.duration}s ${t.liked ? "❤️" : ""}`;
    }).join("\n")
  }
   write(content)
}
export function addTrack(track: Track) {
    db.tracks.push(track);
    write("Zene hozzáadva!")
}

export function addToPlaylist(pid: string, tid: string) {
    const pl = db.playlists.find(p => p.id === pid);
    if (pl && !pl.trackIds.includes(tid)) pl.trackIds.push(tid);
}

export function removeFromPlaylist(pid: string, tid: string) {
    const pl = db.playlists.find(p => p.id === pid);
    if (pl) pl.trackIds = pl.trackIds.filter(id => id !== tid);
}
export function searchTracks(q: string) {
  const s = q.toLowerCase();
  const found = db.tracks.filter(
    (t) =>
      t.title.toLowerCase().includes(s) ||
      t.artist.toLowerCase().includes(s) ||
      (t.album ?? "").toLowerCase().includes(s) ||
      (t.genre ?? "").toLowerCase().includes(s)
  );

  if (found.length === 0) {
    write("❌ Nincs találat.");
    return;
  }

  const content =
    `${found.length} találat:\n` +
    found
      .map(
        (t) =>
          `${t.id}. ${t.title} — ${t.artist} | ${t.album ?? "-"} | ${t.genre ?? "-"} | ${t.duration}s ${t.liked ? "❤️" : ""}`
      )
      .join("\n");

  write(content);
}

export function likeTrack(id: string) {
  const t = db.tracks.find((x) => x.id === id);
  if (!t) {
    write("❌ Nincs ilyen ID");
    return;
  }

  t.liked = true;
  write(`❤️ '${t.title}' mostantól kedvenc.`);
}

export function unlikeTrack(id: string) {
  const t = db.tracks.find((x) => x.id === id);
  if (!t) {
    write("❌ Nincs ilyen ID.");
    return;
  }

  t.liked = false;
  write(`💔 '${t.title}' már nem kedvenc.`);
}
export function createPlaylist(name: string): Playlist {
    const id = db.playlists.length === 0 ? "1" : (Math.max(...db.playlists.map(p => +p.id)) + 1).toString();
    const pl = {
        id,
        name,
        trackIds: [],
        createdAt: new Date().toISOString()
    };
    db.playlists.push(pl);
    return pl;
}
export function deleteTrack(id: string) {
  const index = db.tracks.findIndex((t) => t.id === id);
  if (index === -1) {
    write("❌ Nincs ilyen ID.");
    return;
  }

  const title = db.tracks[index].title;
  db.tracks.splice(index, 1);
  db.playlists.forEach((pl) => {
    pl.trackIds = pl.trackIds.filter((tid) => tid !== id);
  });

  write(`'${title}' törölve.`);
}

export function listPlaylists() {
  if (db.playlists.length === 0) {
    write("Nincs még playlist.");
    return;
  }

  const content =
    "Lejátszási listák:\n" +
    db.playlists
      .map(
        (p) =>
          `${p.id}. ${p.name} | ${p.trackIds.length} dal | létrehozva: ${p.createdAt}`
      )
      .join("\n");

  write(content);
}
export function listPlaylistTracks(id: string) {
  const pl = db.playlists.find((p) => p.id === id);
  if (!pl) {
    write("❌ Nincs ilyen playlist.");
    return;
  }

  if (pl.trackIds.length === 0) {
    write(`${pl.name}\n(Üres lejátszási lista)`);
    return;
  }

  const content =
    `Lejátszási lista: ${pl.name}\n` +
    pl.trackIds
      .map((tid) => {
        const t = db.tracks.find((tr) => tr.id === tid);
        return t
          ? `${t.id}. ${t.title} — ${t.artist} ${t.liked ? "❤️" : ""}`
          : "";
      })
      .join("\n");

  write(content);
}

export function exportData(): string {
    return JSON.stringify(db, null, 2);
}
export function importData(obj: DB) {
  db.tracks = obj.tracks ?? [];
  db.playlists = obj.playlists ?? [];
  write("📥 Adatok importálva.");
}


