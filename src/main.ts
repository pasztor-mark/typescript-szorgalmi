///EBBEN A FÁJLBAN NEM KELL MÓDOSÍTANI SEMMIT!
import { loadSeedData } from "./core/default_data";
import {
  listTracks, searchTracks, likeTrack, unlikeTrack, deleteTrack,
  listPlaylists,
  exportData, importData, db, createPlaylist, addTrack, addToPlaylist, removeFromPlaylist, 
} from "./functions";

loadSeedData()

function generateTrackId(): string {
  if (db.tracks.length === 0) return "1";
  return (Math.max(...db.tracks.map((t) => parseInt(t.id))) + 1).toString();
}
export function generatePlaylistId():string {
  return db.playlists.length === 0 ? "1" : (Math.max(...db.playlists.map(p => +p.id)) + 1).toString();``
}
  document.getElementById("listTracksBtn")!.onclick = () => {
  listTracks();
};
document.getElementById("searchBtn")!.onclick = () => {
  const q = (document.getElementById("searchInput") as HTMLInputElement).value;
  searchTracks(q);
};
document.getElementById("addTrackBtn")!.onclick = () => {
  const title = (document.getElementById("titleInput") as HTMLInputElement).value;
  const artist = (document.getElementById("artistInput") as HTMLInputElement).value;
  const album = (document.getElementById("albumInput") as HTMLInputElement).value;
  const genre = (document.getElementById("genreInput") as HTMLInputElement).value;
  const dur = parseInt((document.getElementById("durationInput") as HTMLInputElement).value) || 0;
  const track = {
    id: generateTrackId(),
    title,
    artist,
    album,
    genre,
    duration: dur,
    liked: false
  }
  console.log(track)
  addTrack(track);
  renderAll()
};
document.getElementById("listPlaylistsBtn")!.onclick = () => {
  listPlaylists()
  renderAll()
};
document.getElementById("createPlaylistBtn")!.onclick = () => {
  const name = (document.getElementById("playlistNameInput") as HTMLInputElement).value;
  createPlaylist(name);
  renderAll()
};

document.getElementById("exportBtn")!.onclick = () => {
  const blob = new Blob([exportData()], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = new Date().toISOString() +".json";
  a.click();
  renderAll()
};

document.getElementById("importBtn")!.onclick = () => {
  const fileInput = document.getElementById("importFile") as HTMLInputElement;
  if (!fileInput.files?.length) return;

  const reader = new FileReader();
  reader.onload = () => {
    importData(JSON.parse(reader.result as string));
  };
  reader.readAsText(fileInput.files[0]);
  renderAll()
  
};

const trackListEl = document.getElementById("trackList")!;
const playlistListEl = document.getElementById("playlistList")!;

function renderTracks() {
  trackListEl.innerHTML = "";

  if (db.tracks.length === 0) {
    trackListEl.innerHTML = "<li>(Nincs track)</li>";
    return;
  }

  db.tracks.forEach((t) => {
    const li = document.createElement("li");

    const title = document.createElement("div");
    title.innerHTML = `
      <strong>${t.title}</strong> - ${t.artist}
      ${t.liked ? "❤️" : ""}
    `;

    const actions = document.createElement("div");
    actions.className = "track-actions";

    const likeBtn = document.createElement("button");
    likeBtn.textContent = t.liked ? "💔" : "❤️";
    likeBtn.className = t.liked ? "btn-unlike" : "btn-like";
    likeBtn.onclick = () => {
      t.liked ? unlikeTrack(t.id) : likeTrack(t.id);
      renderAll();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "btn-delete";
    deleteBtn.onclick = () => {
      deleteTrack(t.id);
      renderAll();
    };

    actions.appendChild(likeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(title);
    li.appendChild(actions);
    trackListEl.appendChild(li);
  });
}
function renderPlaylists() {
  playlistListEl.innerHTML = "";

  if (db.playlists.length === 0) {
    playlistListEl.innerHTML = "<li>(Nincs playlist)</li>";
    return;
  }

  db.playlists.forEach((p) => {
    const li = document.createElement("li");

    const header = document.createElement("div");
    header.innerHTML = `<strong>${p.name}</strong>`;

    const tracksUl = document.createElement("ul");

    p.trackIds.forEach((tid) => {
      const t = db.tracks.find((x) => x.id === tid);
      if (!t) return;

      const tli = document.createElement("li");
      tli.textContent = `${t.title}`;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "❌";
      removeBtn.className = "btn-remove";
      removeBtn.onclick = () => {
        removeFromPlaylist(p.id, t.id);
        renderAll();
      };

      tli.appendChild(removeBtn);
      tracksUl.appendChild(tli);
    });
    const addSelect = document.createElement("select");

    db.tracks
      .filter((t) => !p.trackIds.includes(t.id))
      .forEach((t) => {
        const opt = document.createElement("option");
        opt.value = t.id;
        opt.textContent = t.title;
        addSelect.appendChild(opt);
      });

    const addBtn = document.createElement("button");
    addBtn.textContent = "➕";
    addBtn.className = "btn-add";
    addBtn.onclick = () => {
      if (addSelect.value) {
        addToPlaylist(p.id, addSelect.value);
        renderAll();
      }
    };

    li.appendChild(header);
    li.appendChild(tracksUl);
    li.appendChild(addSelect);
    li.appendChild(addBtn);

    playlistListEl.appendChild(li);
  });
}
removeFromPlaylist
function renderAll() {
  renderTracks();
  renderPlaylists();
}
renderAll() 