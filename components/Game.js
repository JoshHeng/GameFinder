import Image from 'next/image'

export default function Game({ game }) {
	return (
		<div className={`bg-gradient-to-tr rounded-xl m-1 shadow-lg flex-auto w-64 max-w-md ${game.pack.gradient}`}>
			{ game.image && <Image src={`/images/${game.image}`} width={game.imageWidth} height={game.imageHeight} alt="Cover image of game" className="rounded-t-lg" /> }

			<div className="p-2">
				<div className="text-gray-600 text-xs font-bold">{ game.pack.name }</div>
				<h3 className="text-lg font-bold">{ game.name }</h3>
				<blockquote className="font-medium">{ game.description }</blockquote>
			</div>
		</div>
	)
}