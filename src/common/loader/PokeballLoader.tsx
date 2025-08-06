import styles from './PokeballLoader.module.scss';

export const PokeballLoader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.pokeball}></div>
            <div className={styles.shadow}></div>
        </div>
    )
}