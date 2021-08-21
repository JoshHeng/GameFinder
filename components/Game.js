import Image from 'next/image'
import { Heading, Text, Box } from '@chakra-ui/react';

export default function Game({ game }) {
	return (
		<Box borderWidth="1px" borderRadius="lg" boxShadow="lg" w="64" maxW="md" m="1" overflow="hidden" bgGradient={game.gradient || game.pack.gradient || 'linear(to-tr, green.300, blue.500, purple.600)'} flexGrow="1" flexShrink="1" flexBasis="auto">
			<Image src={game.image.src} width={game.image.width} height={game.image.height} alt="Cover image of game" />

			<Box p="2">
				<Text fontWeight="bold" color="gray.600" size="xs">{ game.pack.name }</Text>
				<Heading as="h3" size="md" fontWeight="bold">{ game.name }</Heading>
				<Text fontWeight="medium">{ game.description }</Text>
			</Box>
		</Box>
	);
}