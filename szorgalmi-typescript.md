# (Extra) TypeScript
Ez a lecke segít megérteni a sima JavaScript szintaktikai működését, valamint a JS-re épülő TypeScript alapjait.
## Bevezetés
A **TypeScript** egy erősen típusos programozási nyelv, amely hozzáad extra szintaxist, és típusbiztonságot a JavaScript kódhoz, ami segít a debugolásban, jobb lintinget és IDE funkciókat.

> ### NOTE
> A sima JavaScripttel ellentétben, nem elég linkelni a HTML fájlba, hanem egy Node környezettel át kell fordítani natív JS kóddá. Ezért ajánlott kevésbé komplex feladatokban vagy részfeladatokban maradni a sima JavaScripttel.

```
## Típusok
#### Primitívek
- `string` - szöveg
- `number` - egész és lebegőpontos számok (nincs int vagy float)
- `boolean` - igaz vagy hamis
- `any` - type-checking kihagyása, bármilyen típus lehet.

#### Funkciók definiálása
```typescript
//return típus
type tesztOutput = {
  ido: string
  nev: string
}

function teszt(
  //típusos paraméterek
  firstName: string, 
  lastName: string
  //funkció return típus megadása
  ) : tesztOutput {
    //típusnak megfelelő objektum visszaadása
  return {
    ido: new Date().toISOString();
    nev: `${firstName} ${lastName}`;
  }
}
```
#### Null-safety
A TypeScript két hiányos adattípust különböztet meg: az `undefined` és `null`. Amennyiben nem biztos, hogy a funkció visszatér egy értékkel, (pl. nem sikerül egy API call, vagy a korai return van a kódban) akkor a `?` karakterrel lehet a compile-time hibákat megelőzni.

```typescript
interface User {
  id: number;
  nickname?: string;  // string vagy undefined
}

const u: User = { id: 1 };
console.log(u.nickname);  // undefined
```
#### Többszörös undefined
```typescript
const user = {
  profile: {
    email: "a@b.com",
  }
};

console.log(user.profile?.email);     // "a@b.com"
console.log(user.address?.street);    // undefined, nem dob hibát
```
Type biztosítás (ha valami BIZTOSAN nem null) és null helyettesítés
```typescript
let title: string | null = null;

console.log(title ?? "Nincs cím");  // "Nincs cím"

console.log(title!);  // null
```

### Osztályok/OOP
A TypeScript kiterjeszti a JavaScript korlátozott objektumorientált funkcióit.
```ts
class Animal {
  constructor(public name: string) {}
  speak(): string {
    return `${this.name} hangot ad ki.`;
  }
}

class Dog extends Animal {
  speak(): string {
    return `${this.name} ugat.`;
  }
}

const d = new Dog("Eb");
console.log(d.speak());
```

### Generikusok
Újrahasználható típusbiztos funkciók létrehozása
```ts
interface ApiResponse<T> {
  //ahol T a generikus típus
  data: T;
  status: number;
}

const resp: ApiResponse<User> = { data: u, status: 200 };
```


## Gyakorló feladatok
### 1) Típusos számológép
Készíts egy egyszerű kétbemenetes számológépet az alapműveletekkel (szorzás, osztás, összeadás, kivonás), TypeScript típusok használatával. Használj enumot a művelet paramétereként. Figyeld meg a kódkiegészítés és a linting előnyeit. Nullával való osztás esetén adjon vissza nullát.

Enum szintaxis:

```typescript
enum Operator {
  ADD, SUBTRACT, MULTIPLY, DIVIDE
} 
```

---
### 2) Garázs számontartó
Készíts örökléssel egy tartós "adatbázist" a garázsban lévő járműveknek. 

Használj két Jármű osztályból örökölt alosztályt: az Autó és a Motor osztályt. Írjon a Jármű osztályba egy metódust, ami visszaadja a max fordulatszámot, az alap Jármű esetben `0`, autónál `7'000`, motornál `12'000`. Az osztálynak legyen egy név és egy hengerűrtartalom tulajdonsága. Figyelj a típusokra!

A garázs tartalmát számon tartó adatbázis legyen egy Jármű tömb, Adj hozzá három járművet, majd írd ki ciklussal a garázs tartalmát!

## Beadandó feladat - Playlist kezelő
Valósítsd meg egy TypeScript alkalmazás funkcionalitását, amivel rendszerezheted a kedvenc zeneszámaidat. 

Alább megtalálod a kezdőállapotot és a felhasználói interfész alapját, **a feladatod a függvények megírása lesz. Csak a functions.ts és a types.ts állományokban kell dolgoznia.**
Beadandó a Moodle felületre: a kész `functions.ts` és `types.ts` TypeScript fájl és egy exportált JSON fájl a kedvenc (vagy akármilyen) számaiddal.

A feladat elkezdéséhez klónozd le [ezt]() a repót
```bash
git clone //TODO: gh repo
```
### Adattípusok
Készíts egy `Track` típust vagy interfészt, amely a szám következő adatait tartalmazza:

- `id` - szöveg
- `title` - szöveg
- `artist` - szöveg
- `album` - szöveg vagy határozatlan (opcionális)
- `genre` - szöveg vagy határozatlan (opcionális)
- `duration` - szám (másodperc)
- `liked` - boolean

A zeneszámok tárolására hozz létre egy `Playlist` interfészt vagy típust a következő adatokkal

- `id` - szöveg
- `name` - szöveg
- `trackIds` - szöveg lista
- `createdAt` - szöveg

A zeneszámok és playlistek tárolására hozz létre egy DB típust a következő tulajdonságokkal:
- `tracks`: track lista
- `playlist`: playlist lista
- Használd a kódban megadott alap adatbázist

### Funkciók
- `listTracks` - az összes zeneszám kilistázása tetszőleges formában
  - Ciklussal menj végig az adatbázisban tárolt zeneszámokon
  - Minden elemet írj ki egyenként a konzolra.
  - Ha nincs elmentve zeneszám, tudasd a felhasználóval a függvény elején, majd lépj ki a függvényből.
  - Segítség: csinálj egy külön függvényt a zeneszám kiírására, hogy ne kelljen a feladat során többször újraírni.
- `searchTracks` - zenekeresés és kiírás
  - Figyelj arra, hogy a keresés ne legyen case-sensitive.
  - Szűrd ki a találatokat az alapján, hogy a számok közül melyik tartalmazza a keresési stringet az előadó, album, műfaj vagy zenecím.
  - Írd ki a találatok számát, majd ciklussal a találatokat.
- `likeTrack` - szám kedvelése
  - Válaszd ki az ID alapján keresett számot. Ha nincs ilyen, írd ki és képj ki a függvényből.
  - Változtasd meg a kedvelés állapotát igazra.
- `unlikeTrack` - szám kedvelésének visszavonása
  - A `likeTrack` funkcióhoz hasonlóan járj el, a kedvelés állapotát változtasd hamisra.
- `deleteTrack` - zeneszám törlése az adatbázisból
  - Adj meg ID alapján egy számot, majd keresd meg az adatbázisban az indexét.
  - Távolítsd el a megadott indexet az adatbázisból és az összes playlistből, ahol megjelenik.
  - Segítség: használd a `db.tracks.splice(index, 1)` és a `filter` függvényt
- `listPlaylists` - listázd ki az összes lejátszási lista adatait, zeneszámok nélkül
  - Használj ciklust
- `listPlaylistTracks` - keress ID alapján lejátszási listát, írd ki az adatait és zeneszámait
  - Használj listaszűrést a helyes playlist és tracklist megkeresésére
- `importData` - olvass be JSON fájlt és töltsd fel az adatbázisba.
  - Feltételezzük, hogy a megadott adat nem mindig helyes formátumban van feltöltve. Használj try-catch blokkot, és tudasd a felhasználóval, hogy a formátum helytelen.
  - Használd a `fs.readFileSync(f, "utf-8")` függvényt.
  - A JSON értelmezésére használd a `JSON.parse(json)` funkciót 
- `exportData` - exportáld JSON formátumba az adatbázis tartalmát
  - Feltételezzük, hogy a fájlformátum helyes, de implementálj minimális hibakezelést egy try-catch blokkal.
  - Használd a `fs.writeFileSync(f, jsonString)` funkciót
  - A nyers JSON string eléréséhez használd a `JSON.stringify(json)` függvényt.
### Checklist
- [ ] `Track` típus
- [ ] `Playlist` típus
- [ ] `listTracks` funkció
- [ ] `searchTracks` funkció
- [ ] `likeTrack` funkció
- [ ] `unlikeTrack` funkció
- [ ] `deleteTrack` funkció
- [ ] `listPlaylists` funkció
- [ ] `listPlaylistTracks` funkció
- [ ] `createPlaylistPrompt` funkció
- [ ] `exportData` funkció
- [ ] `importData` funkció

### Futtatási útmutató

1. **Hozz létre egy TypeScript fájlt**: pl. `main.ts`.  
2. **Illeszd be a teljes kódot**, beleértve az adatbázist (`db`), a típusokat, és az összes függvényt.  
3. **Telepítsd a TypeScript-et**, ha még nincs:
   ```bash
   npm install -g typescript
   ```

### Alap kód

```ts
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

 function listTracks() { 

 }
 function searchTracks(q: string) {

 }
 function likeTrack(id: string) { 
   
   }
 function unlikeTrack(id: string) { 
   
   }
 function deleteTrack(id: string) { 
   
   }

 function listPlaylists() { 
   
   }
 function listPlaylistTracks(id: string) { 
   
   }

 function exportData(f: string) { 
   
   }
 function importData(f: string) { 
   
   }



//Megjegyzés: az alábbi funkciók elkészítését és leírását NEM tartalmazza az anyag. A következő óra tesztjén nem fog szerepelni a kód működése.

async function addTrackPrompt() {
  const title = await ask("Cím: ");
  const artist = await ask("Előadó: ");
  const album = await ask("Album (opcionális): ");
  const genre = await ask("Műfaj (opcionális): ");
  const durStr = await ask("Hossz (másodperc): ");
  const duration = parseInt(durStr) || 0;

  const track: Track = {
    id: generateTrackId(),
    title,
    artist,
    album: album || undefined,
    genre: genre || undefined,
    duration,
    liked: false
  };
  db.tracks.push(track);
  console.log("\n✅ Zeneszám hozzáadva!\n");
  }
function showMenu() {
  console.clear();
    console.log(`
🎵  PLAYLIST / ZENEKEZELŐ CLI
──────────────────────────────────
  🎶 [1] Zeneszámok listája
  🔍 [2] Keresés
  ➕ [3] Új zeneszám
  ❤️ [4] Like / Unlike
  🗑️ [5] Törlés

  🎧 [6] Playlistek listája
  🆕 [7] Playlist létrehozása
  ➕ [8] Hozzáadás playlisthez
  ➖ [9] Eltávolítás playlistből

  💾 [E] Export  
  📥 [I] Import

  ❌ [Q] Kilépés
──────────────────────────────────
Nyomj meg egy billentyűt...
`);
}

function startMenu() {
    showMenu();
    input.setRawMode(true);
    input.resume();
    input.setEncoding("utf8");

    input.on("data",  (key: any) => {
        const k = key.toString().toLowerCase();

        input.setRawMode(false);

        switch (k) {
            case "1":  listTracks(); break;
            case "2":  searchTracksPrompt(); break;
            case "3":  addTrackPrompt(); break;
            case "4":  likeUnlikePrompt(); break;
            case "5":  deleteTrackPrompt(); break;

            case "6":  listPlaylists(); break;
            case "7":  createPlaylistPrompt(); break;
            case "8":  addToPlaylistPromptInteractive(); break;
            case "9":  removeFromPlaylistPromptInteractive(); break;

            case "e":  exportPrompt(); break;
            case "i":  importPrompt(); break;

            case "q":
                console.log("\n👋 Kilépés...\n");
                process.exit(0);
        }

        input.setRawMode(true);
        showMenu();
    });
}


async function ask(q: string): Promise<string> {
    return new Promise((resolve) => {
        const rl = readline.createInterface({ input, output });
        rl.question(q, (ans: any) => {
            rl.close();
            resolve(ans);
        });
    });
}

 async function searchTracksPrompt() {
    const q = await ask("🔍 Keresési kifejezés: ");
     searchTracks(q);
}

 async function likeUnlikePrompt() {
    const id = await ask("❤️ Zeneszám ID: ");
    const which = await ask("[L]ike vagy [U]nlike? ");
    if (which.toLowerCase() === "l")  likeTrack(id);
    else  unlikeTrack(id);
}

 async function deleteTrackPrompt() {
    const id = await ask("🗑️ Törlendő track ID: ");
     deleteTrack(id);
}

 async function addToPlaylistPromptInteractive() {
    const id = await ask("🎧 Playlist ID: ");
     addToPlaylistPrompt(id);
}

 async function removeFromPlaylistPromptInteractive() {
    const id = await ask("🎧 Playlist ID: ");
     removeFromPlaylistPrompt(id);
}

 async function exportPrompt() {
    const f = await ask("💾 Export fájl neve: ");
     exportData(f);
}

 async function importPrompt() {
    const f = await ask("📥 Import fájl neve: ");
     importData(f);
}
async function createPlaylistPrompt() {
  const name = await ask("Playlist neve: ");
  const id = db.playlists.length === 0 ? "1" : (Math.max(...db.playlists.map(p => parseInt(p.id))) + 1).toString();
  const newPlaylist: Playlist = {
    id,
    name,
    trackIds: [],
    createdAt: new Date().toISOString()
  };
  db.playlists.push(newPlaylist);
  console.log("✅ Playlist létrehozva!");
}

async function addToPlaylistPrompt(id: string) {
  const pl = db.playlists.find((p) => p.id === id);
  if (!pl) return console.log("❌ Nincs ilyen playlist.");
  const tId= await ask("Track ID hozzáadása: ");
  const track = db.tracks.find((t) => t.id === tId);
  if (!track) return console.log("❌ Nincs ilyen track.");
  if (!pl.trackIds.includes(tId)) pl.trackIds.push(tId);
  console.log("✅ Track hozzáadva a playlisthez.");
}

async function removeFromPlaylistPrompt(id: string) {
  const pl = db.playlists.find((p) => p.id === id);
  if (!pl) return console.log("❌ Nincs ilyen playlist.");
  const tId = await ask("Track ID eltávolítása: ");
  pl.trackIds = pl.trackIds.filter((tid) => tid !== tId);
  console.log("✅ Track eltávolítva a playlistből.");
}


  startMenu();



```

## (Extra) Keretrendszerek
A TypeScript megadta a típusbiztonságot a JavaScriptnek, ami lehetővé tette olyan keretrendszerek elterjedését, amelyek a webarculat fejlesztésén kívül számos egyéb alkalmazásra megfelel.

Ilyen például az [Angular](https://angular.dev), ami bár webarculatfejlesztésre jött létre, a DOM manipulációt és az állapotkezelést megkönnyítette, és az újabb verziók kizárólag TypeScriptet használnak.

Továbbá, elterjedt a [NestJS](https://nestjs.com/) is az iparban, amivel industry-grade backend applikációkat lehet fejleszteni, szintén csak TypeScriptben. Korábban erre a feladatra teljesen más nyelveket és keretrendszereket használtak, mint például a C#-ASP.NET Core és a Java/Kotlin-Spring. Teljesen moduláris, szinte kötelezővé teszi a clean code alapelvek használatát, rendkívül hasznos CLI eszközökkel jön csomagolva, komplex webprojektekre tökéletes választás.

Mivel ez a két keretrendszer egyre elterjedtebb lesz az iparban, ha érdekel a full-stack webfejlesztés és tetszik a TypeScript, érdemes megtanulni ezeket, mint piacképes skill.

Továbbá, a többi piacvezető keretrendszerek, pl. React és Express, lehetővé teszik a TypeScript használatát a JavaScript helyett, és a nagyobb projektek nagyrésze TypeScripttel használja őket.

