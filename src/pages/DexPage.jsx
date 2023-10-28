import { Button, Center, Table } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import capitalizeName from "../utils/capitalize";

const DexPage = () => {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASEURL}/pokemon?limit=1017`
      );
      if (response.status === 200) {
        setPokemons(response.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <Center>
      {" "}
      {pokemons.length === 0 ? (
        <Loader />
      ) : (
        <>
          <Table
            striped
            withTableBorder
            style={{ width: "50vw", margin: "auto", marginTop: "2em" }}
          >
            <Table.Thead
              style={{
                backgroundColor: "#053742",
                color: "white",
                fontWeight: "bolder",
                fontSize: "1rem",
              }}
            >
              <Table.Tr>
                <Table.Th style={{ textAlign: "center" }}>
                  PokéDex Number
                </Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Pokémon</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Link</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {pokemons.map((pokemon, index) => {
                return (
                  <Table.Tr
                    key={index}
                    style={{
                      textAlign: "center",
                      backgroundColor: "#39a2db",
                      color: "white",
                      fontWeight: "bolder",
                      fontSize: "1rem",
                    }}
                  >
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{capitalizeName(pokemon.name)}</Table.Td>
                    <Table.Td>
                      <Link
                        to={`/dex/pokemon/${index + 1}`}
                        className="pkmLink"
                      >
                        <Button
                          variant="filled"
                          radius="md"
                          color="rgba(5, 55, 66, 1)"
                        >
                          More info
                        </Button>
                      </Link>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </>
      )}
    </Center>
  );
};

export default DexPage;
