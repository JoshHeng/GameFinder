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
			_games = _games.concat(pack.games.map(game => ({
				pack: {
					name: pack.name,
					gradient: pack.gradient
				},
				...game
			})));
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
				{ games.map((game, i) => <Game game={game} key={i} />) }
			</Flex>
		</Container>
	);
}

export async function getStaticProps() {
	const directory = path.join(process.cwd(), 'packs');

	let packs = (await fs.readdir(directory)).filter(fileName => fileName.endsWith('.json') && !fileName.startsWith('_')).map(async fileName => JSON.parse(await fs.readFile(path.join(directory, fileName))));
	packs = await Promise.all(packs);

	const imagesDirectory = path.join(process.cwd(), 'public', 'images');
	packs.forEach(pack => {
		pack.games.forEach(game => {
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
		});
	});

	return {
		props: {
			packs: packs
		}
	}
}