import Image from 'next/image'

export default function Game({ game }) {
	return (
		<div className="bg-gradient-to-tr from-yellow-400 to-red-500 rounded-xl m-1 shadow-lg">
			{ game.image && <Image src={`/images/${game.image}`} width={game.imageWidth} height={game.imageHeight} alt="Cover image of game" className="rounded-t-lg" /> }

			<div className="p-2">
				<div className="text-gray-600 text-xs font-bold">{ game.pack }</div>
				<h3 className="text-lg font-bold">{ game.name }</h3>
				<blockquote className="font-medium">{ game.summary }</blockquote>
			</div>
		</div>
	)
}