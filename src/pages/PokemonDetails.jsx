import { Link, useParams } from "react-router-dom/dist";
import axios from "axios";
import { Fragment, useEffect } from "react";
import capitalizeName from "../utils/capitalize";
import { Button, Center, Loader } from "@mantine/core";
import { useState } from "react";
import { setTypeColor } from "../utils/typeColors";
import { Carousel } from "@mantine/carousel";
import { getStatColor } from "../utils/statColors";
import Tabs from "../components/TabComponent/Tabs";
import placeholder from "../assets/No-Image-Placeholder.svg.png";

const PokemonDetails = () => {
  const { dexNumber } = useParams();
  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [levelingMoves, setLevelingMoves] = useState([]);
  const [machineMoves, setMachineMoves] = useState([]);
  const [tutorMoves, setTutorMoves] = useState([]);
  const [normalImage, setNormalImage] = useState(null);
  const [shinyImage, setShinyImage] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASEURL}/pokemon/${dexNumber}`
        );
        setPokemon(data);
        setNormalImage(data.sprites.other["official-artwork"].front_default);
        setShinyImage(data.sprites.other["official-artwork"].front_shiny);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    setIsLoading(true);
    fetchPokemon();
  }, [dexNumber]);

  useEffect(() => {
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
            move.version_group_details[length].move_learn_method.name ===
            "tutor"
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
    grabMoves();
  }, [pokemon]);

  return (
    <div className="pageContainer" id="container">
      <Center>
        {isLoading || !pokemon ? (
          <Loader color="red" size={50} type="bars" className="loader" />
        ) : (
          <div className="pokemonPage">
            <div
              style={{
                display: "flex",
                gap: "1em",
                marginBottom: "-1em",
                marginTop: "1em",
              }}
            >
              {dexNumber > 0 ? (
                <Link to={`/dex/pokemon/${dexNumber - 1}`}>
                  <Button
                    type="button"
                    variant="filled"
                    color="red"
                    radius="lg"
                    m="s"
                  >
                    Previous Pokemon
                  </Button>
                </Link>
              ) : undefined}
              {dexNumber < 1017 ? (
                <Link to={`/dex/pokemon/${parseInt(dexNumber) + 1}`}>
                  <Button
                    type="button"
                    variant="filled"
                    color="red"
                    radius="lg"
                    m="s"
                  >
                    Next Pokemon
                  </Button>
                </Link>
              ) : undefined}
            </div>
            <h1>{capitalizeName(pokemon.name)}</h1>
            <Carousel height={490} loop className="carousel">
              <Carousel.Slide className="pkmImgBox">
                <img
                  src={normalImage ? normalImage : placeholder}
                  alt={pokemon.name}
                  className="pkmImg"
                  style={{ maxHeight: "390px" }}
                />
                <div>Regular</div>
              </Carousel.Slide>

              <Carousel.Slide className="pkmImgBox">
                <img
                  src={shinyImage ? shinyImage : placeholder}
                  alt={pokemon.name}
                  className="pkmImg"
                  style={{ maxHeight: "390px" }}
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
                            color: "black",
                            fontWeight: "500",
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
            <div
              style={{
                marginTop: "-40px",
                display: "flex",
                gap: "1em",
                marginBottom: "1em",
              }}
            >
              {dexNumber > 0 ? (
                <Link to={`/dex/pokemon/${dexNumber - 1}`}>
                  <Button
                    type="button"
                    variant="filled"
                    color="red"
                    radius="lg"
                    m="s"
                  >
                    Previous Pokemon
                  </Button>
                </Link>
              ) : undefined}
              {dexNumber < 1017 ? (
                <Link to={`/dex/pokemon/${parseInt(dexNumber) + 1}`}>
                  <Button
                    type="button"
                    variant="filled"
                    color="red"
                    radius="lg"
                    m="s"
                  >
                    Next Pokemon
                  </Button>
                </Link>
              ) : undefined}
            </div>
          </div>
        )}
      </Center>
    </div>
  );
};

export default PokemonDetails;
