type User = {
  city: string;
  displayName: Include<import('firebase/auth').User['displayName'], string>;
  email: Include<import('firebase/auth').User['email'], string>;
  phoneNumber?: import('firebase/auth').User['phoneNumber'];
  photoUrl?: import('firebase/auth').User['photoURL'];
  uid?: import('firebase/auth').User['uid'];
  pokemons: {
    name: Pokemon['name'];
    id: Pokemon['id'];
    image: Pokemon['sprites']['front_default'];
  }[];
};


type UserDocument = User

interface PokemonDocument {
  uid: User['uid'];
  name: Pokemon['name'];
  id: Pokemon['id'];
}

/**
 * The name and the URL of the referenced resource
 */
interface NamedAPIResource {
  name: string;
  url: string;
}

interface NamedAPIResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

interface APIResource {
  url: string;
}

/**
 * Localized name for a language
 */
interface Name {
  name: string;
  language: NamedAPIResource;
}

interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  sprites: PokemonSprites;
  species: NamedAPIResource;
  stats: PokemonStat[];
  types: PokemonType[];
  past_types: PokemonPastType[];
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

interface PokemonPastType {
  generation: NamedAPIResource;
  types: PokemonType[];
}

interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
}

interface PokemonHeldItemVersion {
  version: NamedAPIResource;
  rarity: number;
}

interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

interface PokemonMoveVersion {
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
  level_learned_at: number;
}

interface PokemonStat {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  other: OtherPokemonSprites;
  //versions: VersionSprites;
}

interface OtherPokemonSprites {
  dream_world: DreamWorld;
  'official-artwork': OfficialArtwork;
  home: Home;
}

interface DreamWorld {
  front_default: string | null;
  front_female: string | null;
}

interface OfficialArtwork {
  front_default: string | null;
}

interface Home {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

// interface VersionSprites {
//   'generation-i': GenerationISprites;
//   'generation-ii': GenerationIISprites;
//   'generation-iii': GenerationIIISprites;
//   'generation-iv': GenerationIVSprites;
//   'generation-v': GenerationVSprites;
//   'generation-vi': GenerationVISprites;
//   'generation-vii': GenerationVIISprites;
//   'generation-viii': GenerationVIIISprites;
// }

// Остальные типы поколений (GenerationISprites, GenerationIISprites и т.д.) 
// можно оставить как есть, если они не используются напрямую.

interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}
