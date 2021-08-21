import Head from 'next/head'
import { promises as fs } from 'fs'
import sizeOf from 'image-size';
import path from 'path'
import { useMemo, useState } from 'react';

import { Container, Heading, Text, Flex, Box, Icon } from '@chakra-ui/react';
import { FiFrown } from 'react-icons/fi';

import Game from '../components/Game';
import Config from '../components/Config';

export default function Home({ packs }) {
	const [ config, setConfig ] = useState({
		people: 4,
		familyFriendly: "0"
	});

	const games = useMemo(() => {
		if (!packs) return [];

		let _games = [];

		packs.forEach(pack => {
			_games = _games.concat(pack.games);
		});

		if (config.people) _games = _games.filter(game => game.minPlayers <= config.people && game.maxPlayers >= config.people);
		if (config.familyFriendly) {
			if (config.familyFriendly === "2") _games = _games.filter(game => game.familyFriendly === true);
			else if (config.familyFriendly === "1") _games = _games.filter(game => game.familyFriendly);
		}

		return _games;
	}, [config, packs]);

	const filteredGames = useMemo(() => {
		let _games = games.slice();

		if (config.people) _games = _games.filter(game => game.minPlayers <= config.people && game.maxPlayers >= config.people);
		if (config.familyFriendly) {
			if (config.familyFriendly === "2") _games = _games.filter(game => game.familyFriendly === true);
			else if (config.familyFriendly === "1") _games = _games.filter(game => game.familyFriendly);
		}

		return _games;
	}, [config, games]);

  	return (
		<Container maxW="container.xl">
			<Head>
				<title>Game Finder</title>
				<meta name="description" content="Find the best online multiplayer games" />
				<meta property="og:description" content="Find the best online multiplayer games" />

				<meta property="og:title" content="Game Finder" />
				<meta property="og:url" content="https://games.joshheng.co.uk" />
				<meta property="og:image" content="https://games.joshheng.co.uk/image.png" />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="en_GB" />

				<link rel="shortcut icon" type="image/png" href="https://games.joshheng.co.uk/favicon.png" />
			</Head>

			<Box mt="4">
				<Heading as="h1" size="xl" color="blue.700">Game Finder</Heading>
				<Text color="blue.600">Find the best online multiplayer games</Text>
			</Box>

			<Config config={config} setConfig={setConfig} />

			<Flex justify="center" wrap="wrap">
				{ filteredGames.map(game => <Game game={game} key={`${game.pack.name}${game.name}`} />) }
				{ filteredGames.length === 0 && (
					<Box textAlign="center" mt="5">
						<Icon as={FiFrown} w="7" h="7" color="gray.600" />
						<Text>No Games Found</Text>
					</Box>
				)}
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