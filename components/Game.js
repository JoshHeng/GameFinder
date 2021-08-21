import Image from 'next/image'
import { Heading, Text, Box, List, ListItem, ListIcon } from '@chakra-ui/react';
import { FiUsers, FiClock, FiSmile } from 'react-icons/fi'
import GameTags from './GameTags';

export default function Game({ game }) {
	return (
		<Box borderWidth="1px" borderRadius="lg" boxShadow="lg" w="64" maxW="md" m="1" overflow="hidden" bgGradient={game.gradient || game.pack.gradient || 'linear(to-tr, green.300, blue.500, purple.600)'} flexGrow="1" flexShrink="1" flexBasis="auto" flexDir="column" style={{ display: 'flex' }}>
			<Image src={game.image.src} width={game.image.width} height={game.image.height} alt="Cover image of game" />

			<Box p="2">
				<Text fontWeight="bold" color="gray.600" size="xs">{ game.pack.name }</Text>
				<Heading as="h3" size="md" fontWeight="bold">{ game.name }</Heading>
				<Text fontWeight="medium">{ game.description }</Text>
			</Box>

			<List m="2" p="3" spacing="1" mt="auto">
				<ListItem>
					<ListIcon as={FiUsers} />
					<Text as="span" fontWeight="bold">Players: </Text>{game.minPlayers}-{game.maxPlayers}
				</ListItem>
				<ListItem>
					<ListIcon as={FiClock} />
					<Text as="span" fontWeight="bold">Duration: </Text>{game.duration || 'Variable'}
				</ListItem>
				<ListItem>
					<ListIcon as={FiSmile} />
					<Text as="span" fontWeight="bold">Family Friendly: </Text>{game.familyFriendly === true ? 'Yes' : (game.familyFriendly === 'optional' ? 'Optional' : 'No')}
				</ListItem>
			</List>

			<GameTags tags={game.tags} free={game.free} />
		</Box>
	);
}