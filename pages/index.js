import Head from 'next/head'
import { promises as fs } from 'fs'
import sizeOf from 'image-size';
import path from 'path'
import { useMemo } from 'react';

import Game from '../components/Game';

export default function Home({ packs }) {
	const games = useMemo(() => {
		if (!packs) return [];

		let _games = [];

		packs.forEach(pack => {
			_games = _games.concat(pack.games.map(game => ({
				pack, 
				...game
			})));
		});

		return _games.sort(() => Math.random()-0.5);
	}, [packs]);

  	return (
		<div className="container mx-auto px-4">
			<Head>
				<title>Game Finder</title>
			</Head>

			<div className="mt-5">
				<h1 className="text-3xl font-bold text-blue-700">Game Finder</h1>
				<p className="text-lg font-semibold text-blue-600">Find the best online, multiplayer games</p>
			</div>

			<div className="flex flex-wrap mt-5 justify-center">
				{ games.map((game, i) => <Game game={game} key={i} />) }
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const directory = path.join(process.cwd(), 'packs');

	const packs = await Promise.all((await fs.readdir(directory)).filter(fileName => fileName.endsWith('.json') && !fileName.startsWith('_')).map(async fileName => JSON.parse(await fs.readFile(path.join(directory, fileName)))));

	const imagesDirectory = path.join(process.cwd(), 'public', 'images');
	packs.forEach(pack => {
		pack.games.forEach(game => {
			if (game.image) {
				const dimensions = sizeOf(path.join(imagesDirectory, game.image));
				game.imageWidth = dimensions.width;
				game.imageHeight = dimensions.height;
			}
		});
	});

	return {
		props: {
			packs: packs
		}
	}
}