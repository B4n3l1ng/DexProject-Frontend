import { useParams } from "react-router-dom/dist";
import axios from "axios";
import { Fragment, useEffect } from "react";
import capitalizeName from "../utils/capitalize";
import { Center } from "@mantine/core";
import { useState } from "react";
import Loader from "../components/Loader";
import { setTypeColor } from "../utils/typeColors";
import { Carousel } from "@mantine/carousel";
import { getStatColor } from "../utils/statColors";

const PokemonDetails = () => {
  const { dexNumber } = useParams();
  const [pokemon, setPokemon] = useState();
  const [levelingMoves, setLevelingMoves] = useState([]);
  const [machineMoves, setMachineMoves] = useState([]);
  const [tutorMoves, setTutorMoves] = useState([]);

  const grabMoves = () => {
    const machine = [];
    const levelUp = [];
    const tutor = [];
    if (pokemon) {
      console.log(pokemon.moves);
      pokemon.moves.forEach((move) => {
        let length = move.version_group_details.length - 1;
        if (
          move.version_group_details[length].move_learn_method.name ===
          "level-up"
        ) {
          levelUp.push({
            name: move.move.name,
            level: move.version_group_details[length].level_learned_at,
          });
        } else if (
          move.version_group_details[length].move_learn_method.name ===
          "machine"
        ) {
          machine.push({ name: move.move.name });
        } else if (
          move.version_group_details[length].move_learn_method.name === "tutor"
        ) {
          tutor.push({ name: move.move.name });
        }
      });
      levelUp.sort((a, b) => {
        return a.level - b.level;
      });
      setMachineMoves(machine);
      setLevelingMoves(levelUp);
      setTutorMoves(tutor);
    }
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASEURL}/pokemon/${dexNumber}`
        );
        setPokemon(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemon();
  }, [dexNumber]);

  useEffect(() => {
    grabMoves();
  }, [pokemon]);
  return (
    <div className="pageContainer">
      <Center>
        {!pokemon ? (
          <Loader />
        ) : (
          <div className="pokemonPage">
            <h1>{capitalizeName(pokemon.name)}</h1>
            <Carousel withIndicators height={490} loop>
              <Carousel.Slide className="pkmImgInnerBox">
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="pkmImg"
                />
                <div>Normal</div>
              </Carousel.Slide>
              <Carousel.Slide className="pkmImgInnerBox">
                <img
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  className="pkmImg"
                />
                <div>Back Normal</div>
              </Carousel.Slide>
              <Carousel.Slide className="pkmImgInnerBox">
                <img
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  className="pkmImg"
                />
                <div>Shiny</div>
              </Carousel.Slide>
              <Carousel.Slide className="pkmImgInnerBox">
                <img
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  className="pkmImg"
                />
                <div>Back Shiny</div>
              </Carousel.Slide>
            </Carousel>
            <div className="typesAndAbility">
              <div className="typesBox">
                <h4>Typing</h4>
                {pokemon.types.map((type) => (
                  <div
                    key={type.slot}
                    style={{
                      backgroundColor: `${setTypeColor(type.type.name)}`,
                    }}
                  >
                    {capitalizeName(type.type.name)}
                  </div>
                ))}
              </div>
              <div className="abilitiesBox">
                <h4>Abilities</h4>
                {pokemon.abilities.map((ability) => (
                  <div key={ability.slot}>
                    {capitalizeName(ability.ability.name)}
                  </div>
                ))}
                {pokemon.past_abilities?.length >= 1
                  ? pokemon.past_abilities.map((pastAbility) => (
                      <div key={`past${pastAbility.slot}`}>
                        {capitalizeName(pastAbility.abilities[0].ability.name)}{" "}
                        until generation{" "}
                        {capitalizeName(pastAbility.generation.name)
                          .split(" ")[1]
                          .toUpperCase()}
                      </div>
                    ))
                  : undefined}
              </div>
            </div>
            <div className="baseStatsBox">
              <h3>Base Stats</h3>
              {pokemon.stats.map((element) => {
                return (
                  <Fragment key={element.stat.name}>
                    <div key={element.stat.name} className="baseStatsInner">
                      <div className="baseStatName">
                        {capitalizeName(element.stat.name)}
                      </div>
                      <div className="baseStatContainer">
                        <div
                          style={{
                            width: `${element.base_stat * (50 / 100)}%`,
                            backgroundColor: `${getStatColor(
                              element.stat.name
                            )}`,
                          }}
                        >
                          {element.base_stat}
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        )}
      </Center>
    </div>
  );
};

export default PokemonDetails;
