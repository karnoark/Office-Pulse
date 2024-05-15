import { Flex, Image, useColorMode } from '@chakra-ui/react'
import React from 'react'

function Header() {

    const {colorMode, toggleColorMode} = useColorMode()

  return (
    <>
    <Flex justifyContent={"center"} mt={6} mb="12">
        <Image
         cursor={"pointer"}
         alt='logo'
         w={6}
         src={colorMode === "dark" ? "/moon.svg" : "/sun.svg"}
         onClick={toggleColorMode}
        />
        {/* {colorMode === "dark" ? <span class="material-symbols-outlined dark" onClick={toggleColorMode} aria-hidden="true"> dark_mode </span> : <span class="material-symbols-outlined light" aria-hidden="true"> light_mode </span>} */}
        
    </Flex>
    </>
  )
}

export default Header