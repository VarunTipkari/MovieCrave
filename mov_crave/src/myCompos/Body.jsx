import {
  Box,
  Button,
  Card,
  Container,
  HStack,
  Image,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { InputGroup } from "../components/ui/input-group";
import Loading from "./Loading";
import { ColorModeButton } from "@/components/ui/color-mode";

export default function Body() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [load, setLoad] = useState(false);

  const getMovies = async (title) => {
    const api_key = import.meta.env.VITE_OMDB_API_KEY;
    setLoad(true);
    try {
      const res = await fetch(`${api_key}&s=${title}`);
      const data = await res.json();

      if (data.Response == "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.log(error);
      setMovies([]);
    } finally {
      setLoad(false);
    }
  };

  return (
    <Container justifyItems="center">
      <Box mt="20px" w={{ base: "300px", md: "500px" }}>
        <HStack width="full">
          <InputGroup flex="1" startElement={<LuSearch />}>
            <Input
              placeholder="search movies"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></Input>
          </InputGroup>
          <Button
            colorPalette="red"
            variant="solidcd"
            onClick={() => {
              getMovies(search);
            }}
          >
            Search
          </Button>
          <ColorModeButton />
        </HStack>
      </Box>

      <Container fluid mt="30px" p={{ base: "0", lg: "20px" }}>
        <SimpleGrid minChildWidth="300px" gap="10px">
          {load ? (
            <Container justifyItems="center">
              <Loading />
            </Container>
          ) : movies?.length > 0 ? (
            movies.map((mov) => (
              <Box key={mov.imdbID}>
                <Card.Root shadow="2xl">
                  <Image
                    src={
                      mov.Poster != "N/A"
                        ? mov.Poster
                        : "https://placehold.co/600x400?text=No+Image+Available"
                    }
                    h={{ base: "200px", lg: "400px" }}
                    fit="contain"
                  />
                  <Card.Body>
                    <Card.Title>{mov.Title}</Card.Title>
                    <Card.Description>
                      {mov.Year}
                      <br />
                      IMDB ID: {mov.imdbID}
                    </Card.Description>
                  </Card.Body>
                </Card.Root>
              </Box>
            ))
          ) : (
            <Box justifyItems="center">Nothing found..</Box>
          )}
        </SimpleGrid>
      </Container>
    </Container>
  );
}
