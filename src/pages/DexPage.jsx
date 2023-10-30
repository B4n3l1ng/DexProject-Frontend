import { Button, Center, Table } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "@mantine/core";
import ReactPaginate from "react-paginate";
import capitalizeName from "../utils/capitalize";

const DexPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 100;

  const fetchPokemons = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASEURL}/pokemon?limit=1017`
      );
      if (response.status === 200) {
        const indexAdded = response.data.results.map((pokemon, index) => ({
          name: pokemon.name,
          url: pokemon.url,
          dexNumber: index + 1,
        }));
        setPokemons(indexAdded);
        setTotalPages(Math.ceil(response.data.results.length / itemsPerPage));
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = pokemons.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <>
      <Center>
        {isLoading ? (
          <Loader color="red" type="dots" />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1em",
            }}
          >
            {
              <>
                <ReactPaginate
                  pageCount={totalPages}
                  onPageChange={handlePageChange}
                  forcePage={currentPage}
                  previousLabel={"<<"}
                  nextLabel={">>"}
                  breakLabel={"..."}
                  containerClassName="paginationContainer"
                  activeClassName={"selectedPage"}
                />
                <Table striped withTableBorder style={{ width: "50vw" }}>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th style={{ textAlign: "center" }}>
                        PokéDex Number
                      </Table.Th>
                      <Table.Th style={{ textAlign: "center" }}>
                        Pokémon
                      </Table.Th>
                      <Table.Th style={{ textAlign: "center" }}>Link</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {subset.map((pokemon) => {
                      return (
                        <Table.Tr key={pokemon.dexNumber}>
                          <Table.Td>{pokemon.dexNumber}</Table.Td>
                          <Table.Td>{capitalizeName(pokemon.name)}</Table.Td>
                          <Table.Td>
                            <Link
                              to={`/dex/pokemon/${pokemon.dexNumber}`}
                              className="tableLink"
                            >
                              <Button
                                type="button"
                                variant="filled"
                                color="red"
                                radius="lg"
                                m="s"
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
            }
          </div>
        )}
      </Center>
    </>
  );
};

export default DexPage;
