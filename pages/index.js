import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  	return (
		<div className="container mx-auto px-4">
			<Head>
				<title>Game Finder</title>
			</Head>

			<div className="mt-5">
				<h1 className="text-3xl font-bold text-blue-700">Game Finder</h1>
				<p className="text-lg font-semibold text-blue-600">Find the best online, multiplayer games</p>
			</div>

			<div className="grid grid-cols-8 mt-5">
				<div className="border-2 border-blue-500 rounded-md p-2">
					<h3 className="text-lg font-bold text-blue-700">Game Name</h3>
					<p className="text-md font-semibold">Game Description</p>
				</div>
			</div>
		</div>
	);
}