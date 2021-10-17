import Head from 'next/head'
import { promises as fs } from 'fs'
import sizeOf from 'image-size';
import path from 'path'
import { useMemo, useState, useEffect } from 'react';

import { Container, Heading, Text, Flex, Box, Icon, Center, Button, useClipboard, Alert, AlertIcon } from '@chakra-ui/react';
import { FiFrown } from 'react-icons/fi';

import Game from '../components/Game';
import Config from '../components/Config';

const tags = ['drawing', 'words', 'coop', 'trivia', 'action', 'funny', 'personal', 'free'];


/**
 * Durstenfeld shuffle
 * See SO https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param {*} array 
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default function Home({ packs }) {
	const [ config, setConfig ] = useState({
		people: 0,
		familyFriendly: "0",
		packs: packs.map(pack => pack.id.toString()),
	});
	const [ shuffle, setShuffle ] = useState(0);
	const [ clipboardValue, setClipboardValue ] = useState(null);
	const { hasCopied, onCopy } = useClipboard(clipboardValue);

	// Set config from URL
	useEffect(() => {
		if (!location.search) return;
		const configParams = new URLSearchParams(location.search);
		if (configParams.values().length === 0) return;

		let changedConfig = {};

		if (configParams.get('people')) {
			const val = parseInt(configParams.get('people'));
			if (!isNaN(val) && val >= 0 && val <= 20) changedConfig.people = val;
		}
		if (configParams.get('familyFriendly')) {
			const val = parseInt(configParams.get('familyFriendly'));
			if (!isNaN(val) && val >= 0 && val <= 2) changedConfig.familyFriendly = val.toString();
		}
		if (configParams.get('tags')) {
			const val = configParams.get('tags').split(',');
			
			changedConfig.tags = [];
			val.forEach(tag => tags.includes(tag) && changedConfig.tags.push(tag));
		}
		if (configParams.get('packs')) {
			const val = parseInt(configParams.get('packs'));
			if (!isNaN(val) && val >= 0) {
				changedConfig.packs = [];
				const packsBits = val.toString(2).padStart(packs.length, 0);
				packs.slice().reverse().forEach((pack, i) => packsBits[i] === "1" && changedConfig.packs.push(pack.id.toString()));
			}
		}

		setConfig(_config => ({
			..._config,
			...changedConfig
		}));
	}, [packs]);

	const games = useMemo(() => {
		if (!packs) return [];

		let _games = [];

		packs.forEach(pack => {
			_games = _games.concat(pack.games);
		});

		if (shuffle) shuffleArray(_games);

		return _games;
	}, [packs, shuffle]);

	const filteredGames = useMemo(() => {
		let _games = games.slice();

		if (config.packs) _games = _games.filter(game => config.packs.includes(game.pack.id));
		if (config.people) _games = _games.filter(game => game.minPlayers <= config.people && (game.maxPlayers === 'unlimited' || game.maxPlayers >= config.people));
		if (config.familyFriendly) {
			if (config.familyFriendly === "2") _games = _games.filter(game => game.familyFriendly === true);
			else if (config.familyFriendly === "1") _games = _games.filter(game => game.familyFriendly);
		}
		if (config.tags && config.tags.length > 0) {
			for (const tag of config.tags) {
				_games = _games.filter(game => game.tags && game.tags.includes(tag));
			}
		}

		return _games;
	}, [config, games]);

	function copyConfigUrlToClipboard() {
		// Construct packs integer
		let packsBits = '';
		packs.slice().reverse().forEach(pack => packsBits += (config.packs.includes(pack.id.toString()) ? '1' : '0'));
		const params = new URLSearchParams({
			packs: parseInt(packsBits, 2)
		});

		// Add additional options
		if (config.people !== 0) params.set('people', config.people);
		if (config.familyFriendly !== "0") params.set('familyFriendly', config.familyFriendly); 
		if (config.tags?.length > 0) params.set('tags', config.tags);
		
		setClipboardValue(`https://games.joshheng.co.uk?${params.toString()}`);
		onCopy();
	}

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

			<Config config={config} setConfig={setConfig} packs={packs} />

			{ hasCopied && (
				<Alert status="success" mb="3">
					<AlertIcon />
					Share URL copied successfully!
					<br />{clipboardValue}
				</Alert>
			)}

			{ filteredGames.length > 0 ? (
				<Box textAlign="center">
					<Flex justify="center" alignContent="center" mb="2">
						<Text ml="1" mr="1" color="gray.600"><Text as="span" fontWeight="bold">{ filteredGames.length }</Text> Games Found</Text>
						<Button ml="1" mr="1" variant="outline" size="xs" onClick={() => setShuffle(prev => prev + 1)}>Shuffle</Button>
						<Button ml="1" mr="1" variant="outline" size="xs" onClick={copyConfigUrlToClipboard}>{ hasCopied ? 'Copied' : 'Share' }</Button>
					</Flex>
					<Flex justify="center" wrap="wrap">
						{ filteredGames.map(game => <Game game={game} key={`${game.pack.name}${game.name}`} />) }
					</Flex>
				</Box>
			) : (
				<Box textAlign="center" mt="5">
					<Icon as={FiFrown} w="7" h="7" color="gray.600" />
					<Text>No Games Found</Text>
				</Box>
			)}

			<Center m="4" mt="10">
				<Text>Made by <Text as="a" href="https://www.joshheng.co.uk" target="_blank" rel="noopener noreferrer" color="blue.600">Josh Heng</Text> | Open Source on <Text as="a" href="https://github.com/JoshHeng/GameFinder" target="_blank" rel="noopener noreferrer" color="blue.600">GitHub</Text></Text>
			</Center>
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

	packs = packs.sort((a, b) => a.id - b.id).map(pack => ({
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

			const tags = game.tags || [];
			if (!pack.paid) tags.push('free');

			return {
				...game,
				tags,
				pack: {
					name: pack.name,
					gradient: pack.gradient || null,
					url: pack.url || null,
					id: pack.id.toString(),
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