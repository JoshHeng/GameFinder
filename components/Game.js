import Image from 'next/image'

export default function Game({ game }) {
	return (
		<div className="bg-gray-100 rounded-xl m-1">
			{ game.image && <Image src={`/images/${game.image}`} width={game.imageWidth} height={game.imageHeight} alt="Cover image of game" className="rounded-t-lg" /> }

			<div className="p-2">
				<h3 className="text-lg font-bold text-blue-700">{ game.name }</h3>
				<blockquote className="font-medium">{ game.summary }</blockquote>

				<div className="text-gray-600">{ game.pack }</div>
			</div>
			
		</div>
	)
}