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
import Tabs from "../components/TabComponent/Tabs";

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
            <Carousel
              /* withIndicators */ height={490}
              loop
              className="carousel"
            >
              <Carousel.Slide className="pkmImgBox">
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="pkmImg"
                />
                <div>Regular</div>
              </Carousel.Slide>
              <Carousel.Slide className="pkmImgBox">
                <img
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  className="pkmImg"
                />
                <div>Shiny</div>
              </Carousel.Slide>
            </Carousel>
            <div className="typesAndAbility">
              <div className="typesBox boxWithRadius">
                <div className="drkBlueBox">Typing</div>
                {pokemon.types.map((type) => (
                  <div
                    key={type.slot}
                    style={{
                      backgroundColor: `${setTypeColor(type.type.name)}`,
                    }}
                    className="type"
                  >
                    {capitalizeName(type.type.name)}
                  </div>
                ))}
              </div>
              <div className="abilitiesBox boxWithRadius">
                <div className="drkBlueBox">Abilities</div>

                {pokemon.abilities.map((ability) => (
                  <div key={ability.slot} className="whiteText">
                    {capitalizeName(ability.ability.name)}
                  </div>
                ))}
                {pokemon.past_abilities?.length >= 1
                  ? pokemon.past_abilities.map((pastAbility) => (
                      <div
                        key={`past${pastAbility.slot}`}
                        className="whiteText"
                      >
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
            <div className="baseStatsBox boxWithRadius">
              <div className="drkBlueBox" style={{ marginBottom: "1em" }}>
                Base Stats
              </div>
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
            <div className="movesBox">
              <Tabs
                levelingMoves={levelingMoves}
                tutorMoves={tutorMoves}
                machineMoves={machineMoves}
              />
            </div>
          </div>
        )}
      </Center>
    </div>
  );
};

export default PokemonDetails;
