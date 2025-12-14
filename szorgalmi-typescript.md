# (Extra) TypeScript
Ez a lecke segít megérteni a sima JavaScript szintaktikai működését, valamint a JS-re épülő TypeScript alapjait.
## Bevezetés
A **TypeScript** egy erősen típusos programozási nyelv, amely hozzáad extra szintaxist, és típusbiztonságot a JavaScript kódhoz, ami segít a debugolásban, jobb lintinget és IDE funkciókat.

> ### NOTE
> A TypeScript kódot buildelni kell JavaScriptre, ezért közvetlenül nem futtatható a böngészőben. Ezért ajánlott kevésbé komplex feladatokban vagy részfeladatokban maradni a sima JavaScripttel.
## Telepítés
A TypeScript környezet létrehozása Node használatával macerás, ezért javasolt egy keretrendszer használata.
Erre a Vite-et fogjuk használni a `npm create vite@latest` parancssal
```
➜  $ npm create vite@latest .

> npx
> create-vite .

│
◇  Select a framework:
│  Vanilla
│
◇  Select a variant:
│  TypeScript
│
◇  Use rolldown-vite (Experimental)?:
│  No
│
◇  Install with npm and start now?
│  Yes
│
◇  Scaffolding project in (path)
```

```
project/
├─ index.html
├─ src/
│  └─ main.ts
└─ dist/
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
Készítsd el egy TypeScript alkalmazást, amivel rendszerezheted a kedvenc zeneszámaidat. 
Csak a `functions.ts` állományban dolgozz! Minden egyéb függvény, HTML és stíluselem alapból meg van adva.

Alább megtalálod a kezdőállapotot menü alapját, **a feladatod a függvények megírása lesz.**
Beadandó a Moodle felületre: a kész TypeScript fájl és egy exportált JSON fájl a kedvenc (vagy akármilyen) számaiddal.
- `style.css` - stíluslap a HTML fájlnak, szintén **nem kell módosítani**, de ha van kedved, alakítsd tetszésed szerint.
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
- `playlists`: playlist lista
- Használd a kódban megadott alap adatbázist

### Funkciók
> NOTE
> A függvények paramétereinek típusai üresen lettek hagyva. A compiler erre figyelmeztet `implicitAny` kivétellel, ezért add meg a szükséges típust a következő módón: `...function searchTracks(q: string) {...`

#### FONTOS! Kiíratáshoz használd az alapból megadott write() függvényt!

- `listTracks` - az összes zeneszám kilistázása tetszőleges formában
  - Készíts elő egy üres string tartalmú változót a visszaadási értéknek.
  - Nézd meg, hogy van-e mit kilistázni. Ha nincs, lépj ki a függvényből
  - Ciklussal menj végig az adatbázisban tárolt zeneszámokon, majd tetszőleges formában formázd string tömbbé, majd a `.join("\n")` függvénnyel alakítsd stringgé.
  - Segítség: csinálj egy külön függvényt a zeneszám kiírására, hogy ne kelljen a feladat során többször újraírni.
  - Írd ki az így kapott stringet a `write()` függvénnyel 
- `searchTracks` - zenekeresés és kiírás
  - Figyelj arra, hogy a keresés ne legyen case-sensitive.
  - Szűrd ki a találatokat az alapján, hogy a számok közül melyik tartalmazza a keresési stringet az előadó, album, műfaj vagy zenecím. (`.toLowerCase().includes()`)
  - Ha nincs a keresésnek megfelelő szám, tudasd a felhasználóval és lépj ki a függvényből.
  - Ha talált,
  - Írd ki az így kapott stringet tetszőlegesen formázva a `write()` függvénnyel 
- `addTrack` - add hozzá a paraméterül kapott számot az adatbázishoz, és írd ki az eredményt.
- `addToPlaylist` - adj hozzá egy zenét a playlisthez
  - A függvény paramétere egy playlist id és egy track id
  - Keresd meg a playlistet és tracket
  - Kerüld el a duplikált számokat a playlistben
- `removeFromPlaylist` - törölj egy számot a playlistből
  - Szintén meg van adva egy track id és playlist id
  - Keresd meg a playlistet
  - Ellenőrizd, hogy a playlist tartalmazza-e a megadott zeneszám azonosítóját
  - Ha igen, töröld, ha nem, jelezd a felhasználónak
- `likeTrack` - szám kedvelése
  - Válaszd ki az ID alapján keresett számot. Ha nincs ilyen, írd ki és képj ki a függvényből.
  - Változtasd meg a kedvelés állapotát igazra.
- `unlikeTrack` - szám kedvelésének visszavonása
  - A `likeTrack` funkcióhoz hasonlóan járj el, a kedvelés állapotát változtasd hamisra.
- `deleteTrack` - zeneszám törlése az adatbázisból
  - A függvény egy string típusú ID mezőt kér paraméterül.
  - Nézd meg, hogy létezik-e ilyen track ezzel az ID-vel, ha nincs, jelezd a felhasználónak
  - Ha van ilyen, töröld ki a listából.
  - Segítség: használd a `db.tracks.splice(index, 1)` vagy a `filter` függvényt. Figyelj arra, hogy melyik függvény változtatja meg az alap tömböt!
- `createPlaylist` - hozz létre egy új playlistet
  - Használd a generatePlaylistId() függvényt az új azonosító létrehozásához
  - Adj hozzá egy új elemet az adatbázishoz, majd térjen vissza az újonnan létrehozott elemmel
- `listPlaylists` - listázd ki az összes lejátszási lista adatait, zeneszámok nélkül
  - Ellenőrizd, hogy az adatbázis playlistjeiben vannak elemek
  - Ha nincs, írd ki a felhasználónak, majd térj vissza üresen.
  - Használj ciklust, és tetszőleges formában írd ki a lejátszási listákat
- `listPlaylistTracks` - keress ID alapján lejátszási listát, írd ki az adatait és zeneszámait
  - Használj listaszűrést a helyes playlist és tracklist megkeresésére
  - Ha nem talált semmit, vagy a keresett playlist üres, írd ki, és térj vissza üresen.
  - Listázd ki az elemeket tetszőleges formátumban.
- `importData` - olvass be JSON fájlt és töltsd fel az adatbázisba.
  - Feltételezzük, hogy a megadott adat nem mindig helyes formátumban van feltöltve. 
  - Használd a paraméterekben adott adatbázis objektumot, majd töltsd be az aktuális adatbázisba az elemeket
  - Használd a null check operátort `??` arra, hogy ellenőrizd, hogy az adattagok léteznek-e
- `exportData` - exportáld JSON formátumba az adatbázis tartalmát
  - Feltételezzük, hogy a fájlformátum helyes, de implementálj minimális hibakezelést egy try-catch blokkal.
  - Az exportálás az alap aállományban található függvénben meg van hívva, térj vissza egy nyers JSON stringgel
  - A nyers JSON string eléréséhez használd a `JSON.stringify(json)` függvényt.
### Checklist
- [ ] `listTracks`
- [ ] `searchTracks`
- [ ] `addTrack`
- [ ] `addToPlaylist`
- [ ] `removeFromPlaylist`
- [ ] `likeTrack`
- [ ] `unlikeTrack`
- [ ] `deleteTrack`
- [ ] `createPlaylist`
- [ ] `listPlaylists`
- [ ] `listPlaylistTracks`
- [ ] `importData`
- [ ] `exportData`


### Futtatási útmutató
- Töltsd le a megadott zip állományt, vagy klónozd le a megadott repót
- A mappa termináljában futtasd le a `npm i` parancsot a csomagok telepítéséhez
  - Megjegyzés: ehhez a Node.js szükséges, annak a telepítéséért látogass el [ide](https://nodejs.org/en/download)
- `npm run dev` terminálparancssal tudod futtatni.
  - Ez figyeli a változásokat, ezért nem kell folyamatosan újra futtatnod.

### Alap kód
```typescript
import type { DB, Playlist, Track } from "./types";
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
export function addTrack(track: Track) {
}

export function addToPlaylist(pid: string, tid: string) {
}

export function removeFromPlaylist(pid: string, tid: string) {
}
export function searchTracks(q: string) {
}

export function likeTrack(id: string) {
}

export function unlikeTrack(id: string) {
}
export function createPlaylist(name: string): Playlist {
}
export function deleteTrack(id: string) {
}
export function listPlaylists() {
}
export function listPlaylistTracks(id: string) {
}

export function exportData(): string {
}
export function importData(obj: DB) {
}
```
## (Extra) Keretrendszerek
A TypeScript megadta a típusbiztonságot a JavaScriptnek, ami lehetővé tette olyan keretrendszerek elterjedését, amelyek a webarculat fejlesztésén kívül számos egyéb alkalmazásra megfelel.

Ilyen például az [Angular](https://angular.dev), ami bár webarculatfejlesztésre jött létre, a DOM manipulációt és az állapotkezelést megkönnyítette, és az újabb verziók kizárólag TypeScriptet használnak.

Továbbá, elterjedt a [NestJS](https://nestjs.com/) is az iparban, amivel industry-grade backend applikációkat lehet fejleszteni, szintén csak TypeScriptben. Korábban erre a feladatra teljesen más nyelveket és keretrendszereket használtak, mint például a C#-ASP.NET Core és a Java/Kotlin-Spring. Teljesen moduláris, szinte kötelezővé teszi a clean code alapelvek használatát, rendkívül hasznos CLI eszközökkel jön csomagolva, komplex webprojektekre tökéletes választás.

Mivel ez a két keretrendszer egyre elterjedtebb lesz az iparban, ha érdekel a full-stack webfejlesztés és tetszik a TypeScript, érdemes megtanulni ezeket, mint piacképes skill.

Továbbá, a többi piacvezető keretrendszerek, pl. React és Express, lehetővé teszik a TypeScript használatát a JavaScript helyett, és a nagyobb projektek nagyrésze TypeScripttel használja őket.