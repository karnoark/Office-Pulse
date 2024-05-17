import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

function HomePage() {
  return (
    <Link to={"/markzuckerberg"}>
      <Flex w={"full"} justifyContent={"center"}>
        <Button mx={"auto"}>Visit profile page</Button>
      </Flex>
    </Link>
  );
}

export default HomePage;
