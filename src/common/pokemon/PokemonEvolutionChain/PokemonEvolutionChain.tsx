import { useRequestEvolutionChain } from '../../../api/hooks/useRequestEvolutionChain';
import { generatePokemonChain } from '../../../utils/helpers/generatePokemonChain';
import { Typography } from '../../typography/Typography';
import { PokemonShortCut } from '../PokemonShortCut/PokemonShortCut';
import styles from './PokemonEvolutionChain.module.scss';
interface PokemonEvolutionChainProps {
  chainId: string;
  name: string;
}

export const PokemonEvolutionChain = ({ chainId, name }: PokemonEvolutionChainProps) => {
  const { data, isLoading } = useRequestEvolutionChain(chainId);
  if (!data || isLoading) return null;

  const chain = generatePokemonChain(name, data.data.chain);

  return (
    <div className={styles.evolution}>
      {chain?.prev && (
        <div>
          <Typography variant="sub-title">Previous evolution</Typography>
          <PokemonShortCut name={chain.prev.species.name} />
        </div>
      )}
      {chain?.next.length > 0 && (
        <div>
          <Typography variant="sub-title">Next evolution</Typography>
          {chain.next.map((evolution: any) => (
            <PokemonShortCut key={evolution.species.name} name={evolution.species.name} />
          ))}
        </div>
      )}
    </div>
  );
};
