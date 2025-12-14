import type { Track, Playlist } from "../types";
import { db } from "../functions";

export function loadSeedData() {
  if (db.tracks.length || db.playlists.length) return;

  const tracks: Track[] = [
    {
      id: "1",
      title: "I Wonder",
      artist: "Kanye West",
      album: "Graduation",
      genre: "Hip-Hop",
      duration: 243,
      liked: true,
    },
    {
      id: "2",
      title: "No More Parties In LA",
      artist: "Kanye West",
      album: "The Life Of Pablo",
      genre: "Hip-Hop",
      duration: 374,
      liked: false,
    },
    {
      id: "3",
      title: "Heartless",
      artist: "Kanye West",
      album: "808s & Heartbreak",
      genre: "Hip-Hop",
      duration: 211,
      liked: false,
    },
    {
      id: "4",
      title: "Devil In A New Dress",
      artist: "Kanye West, Rick Ross",
      album: "My Beautiful Dark Twisted Fantasy",
      genre: "Hip-Hop",
      duration: 352,
      liked: true,
    },
    {
      id: "5",
      title: "Flashing Lights",
      artist: "Kanye West",
      album: "Graduation",
      genre: "Hip-Hop",
      duration: 237,
      liked: false,
    },
    {
      id: "6",
      title: "Runaway",
      artist: "Kanye West",
      album: "My Beautiful Dark Twisted Fantasy",
      genre: "Hip-Hop",
      duration: 548,
      liked: true,
    },
  ];

  const playlists: Playlist[] = [
    {
      id: "1",
      name: "Tanulás",
      trackIds: ["1", "2", "4", "6"],
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Vezetés",
      trackIds: ["3", "6"],
      createdAt: new Date().toISOString(),
    },
  ];

  db.tracks.push(...tracks);
  db.playlists.push(...playlists);
}
