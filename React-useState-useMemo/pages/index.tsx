import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from "react"

interface Pokemon {
  id: number
  name: string
  image: string
}

export async function getServerSideProps() {

  const response = await fetch (
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  )
  return {
    props: {
      pokemon: await response.json()
    }
  }

}

export default function Home({pokemon}:{pokemon: Pokemon[]}) {

  const [filter, setFilter] = React.useState("")

  const filteredPokemon = React.useMemo(() => 
    pokemon.filter((filterPokemon) => 
      filterPokemon.name.toLowerCase().includes(filter.toLowerCase())
    ), [filter, pokemon]
  )

  return(
    <div className={styles.main}>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Generated by Create Next App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <input 
          type="text" 
          value={filter} 
          onChange={(event) => setFilter(event.target.value)}
          className={styles.search}
        />
      </div>
      <div className={styles.container}>
        {filteredPokemon.slice(0,20).map((mapPokemon) => (
          <div key={mapPokemon.id} className={styles.image}>
            <img 
              alt={mapPokemon.name} 
              src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${mapPokemon.image}`}
            />
            <h2>{mapPokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )

}