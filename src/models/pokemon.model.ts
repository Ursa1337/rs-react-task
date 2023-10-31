export interface PokemonDescription {
  sprites: {
    other: {
      ['official-artwork']: {
        front_default: 'string';
      };
    };
  };
  stats: StatType[];
}

export interface StatType {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
