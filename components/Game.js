import Image from 'next/image'
import {Heading, Text, Box, List, ListItem, ListIcon, Icon} from '@chakra-ui/react';
import { FiUsers, FiClock, FiSmile } from 'react-icons/fi'
import { BiInfinite } from 'react-icons/bi';
import GameTags from './GameTags';
import { memo } from 'react';

export default memo(function Game({ game }) {
	return (
		<Box borderWidth="1px" borderRadius="lg" boxShadow="lg" w="64" maxW="md" m="1" overflow="hidden" bgGradient={game.gradient || game.pack.gradient || 'linear(to-tr, green.300, blue.500, purple.600)'} flexGrow="1" flexShrink="1" flexBasis="auto" flexDir="column" style={{ display: 'flex' }} as={ game.url ? "a" : "div" } href={game.url} rel="noopener noreferrer" target="_blank">
			<Image src={game.image.src} width={game.image.width} height={game.image.height} alt="Cover image of game" style={{ width: game.image.width, height: game.image.height }} />

			<Box p="2">
				{ game.pack.name && (
					game.pack.url ? (
						<a href={game.pack.url} rel="noopener noreferrer" target="_blank">
							<Text fontWeight="bold" color="gray.200" size="xs">{ game.pack.name }</Text>
						</a>
					) :
					<Text fontWeight="bold" color="gray.200" size="xs">{ game.pack.name }</Text>
				)}

				{ game.url ? (
					<a href={game.url} rel="noopener noreferrer" target="_blank">
						<Heading as="h3" size="md" fontWeight="bold">{ game.name }</Heading>
					</a>
				) :
					<Heading as="h3" size="md" fontWeight="bold">{ game.name }</Heading>
				}
				<Text fontWeight="medium">{ game.description }</Text>
			</Box>

			<List m="2" p="3" spacing="1" mt="auto">
				<ListItem>
					<ListIcon as={FiUsers} />
          <Text as="span" fontWeight="bold">Players: </Text><div style={{ display: 'inline-flex', alignItems: 'center' }}>{game.minPlayers}-{game.maxPlayers === 'unlimited' ? <Icon as={BiInfinite} mt="0.2rem" /> : game.maxPlayers}</div>
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

			<GameTags tags={game.tags} />
		</Box>
	);
	//Do not rerender if props changed - no need
}, () => true);