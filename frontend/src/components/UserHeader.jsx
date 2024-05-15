import { Avatar, Box, Flex, Text, VStack, useTheme, Link, Menu, MenuButton, Portal, MenuList, MenuItem, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";


const UserHeader = () => {
    const theme = useTheme()
    const gray = {light: "#616161", dark: "#1e1e1e" }
    const toast = useToast()
    const copyURL = () => {
        const currentURL = window.location.href;
        // console.log(currentURL)
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                title: "Copied",
                status: "success",
                description: "profile link is copied",
                duration: 3000,
                isClosable: true
            })
        })
    }
    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>Mark Zuckerberg</Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>zuck</Text>
                        <Text fontSize={"xs"} bg={gray.dark} color={gray.light} p={1} borderRadius={"full"}>
                            Threads.next
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar name="Mark Zuckerberg" src="/zuck-avatar.png" size={{
                        base: "md",
                        md: "xl",
                    }} />
                </Box>
            </Flex>

            <Text>Co-founder, executive chairman and CEO of Meta Platforms</Text>
            
            <Flex w={"full"} justifyContent={"space-between"} >
                <Flex gap={2} alignItems={"center"}>
                    <Text color={gray.light}> 3.2M followers</Text>
                    <Box w='1' h='1' bg={gray.light} borderRadius={"full"}></Box>
                    <Link color={gray.light}>Instagram.com</Link>
                </Flex>
                <Flex gap={2}>
                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Box>
                        <Menu>
                            <MenuButton>
                        <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={gray.dark}>
                                    <MenuItem bg={gray.light} onClick={copyURL}>Copy Link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>


            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb='3' cursor={"pointer"}>
                    <Text fontWeight={"bold"}> Threads </Text>
                </Flex>
                <Flex flex={1} borderBottom={"1.5px solid gray"} color={gray.light} justifyContent={"center"} pb='3' cursor={"pointer"}>
                    <Text fontWeight={"bold"}> Replies </Text>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default UserHeader