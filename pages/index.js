import Head from 'next/head'
import { promises as fs } from 'fs'
import sizeOf from 'image-size';
import path from 'path'
import { useMemo } from 'react';

import { Container, Heading, Text, Flex, Box } from '@chakra-ui/react';

import Game from '../components/Game';

export default function Home({ packs }) {
	const games = useMemo(() => {
		if (!packs) return [];

		let _games = [];

		packs.forEach(pack => {
			_games = _games.concat(pack.games);
		});

		return _games.sort(() => Math.random()-0.5);
	}, [packs]);

  	return (
		<Container maxW="container.xl">
			<Head>
				<title>Game Finder</title>
			</Head>

			<Box>
				<Heading as="h1" size="xl" color="blue.700">Game Finder</Heading>
				<Text color="blue.600">Find the best online, multiplayer games</Text>
			</Box>

			<Flex justify="center" wrap="wrap">
				{ games.map(game => <Game game={game} key={`${game.pack.name}${game.name}`} />) }
			</Flex>
		</Container>
	);
}

/**
 * Gets the packs from the packs directory
 * @returns {Promise<Object[]>} Array of game packs
 */
async function getPacks() {
	const directory = path.join(process.cwd(), 'packs');

	const packFiles = (await fs.readdir(directory)).filter(fileName => fileName.endsWith('.json') && !fileName.startsWith('_'));
	const packs = packFiles.map(async fileName => JSON.parse(await fs.readFile(path.join(directory, fileName))));

	return await Promise.all(packs);
}

/**
 * Converts game packs to a better format, converting images and adding pack data to each game
 * @param {Object[]} packs Array of game packs
 * @returns {Object[]} Array of game packs
 */
function processPacks(packs) {
	const imagesDirectory = path.join(process.cwd(), 'public', 'images');

	packs= packs.map(pack => ({
		...pack,
		games: pack.games.map(game => {
			if (game.image) {
				const dimensions = sizeOf(path.join(imagesDirectory, pack.slug, game.image));
				if (!dimensions) game.image = null;

				game.image = {
					src: `/images/${pack.slug}/${game.image}`,
					width: dimensions.width,
					height: dimensions.height
				};
			}
			if (!game.image) {
				const dimensions = sizeOf(path.join(imagesDirectory, 'default.jpg'));
				game.image = {
					src: `/images/default.jpg`,
					width: dimensions.width,
					height: dimensions.height
				};
			}

			return {
				...game,
				pack: {
					name: pack.name,
					gradient: pack.gradient || null
				}
			}
		})
	}));

	return packs;
}

export async function getStaticProps() {
	let packs = await getPacks();

	packs = processPacks(packs);

	return {
		props: {
			packs: packs
		}
	}
}