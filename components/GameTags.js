import { Wrap, WrapItem, Tag, TagLeftIcon, TagLabel } from '@chakra-ui/react';
import { FiEdit2, FiBook, FiUsers, FiBookmark } from 'react-icons/fi';
import { BiQuestionMark, BiRocket, BiLaugh, BiUser } from 'react-icons/bi';

function GameTag({ type }) {
	switch (type) {
		case 'drawing':
			return (
				<Tag size="sm" colorScheme="pink">
					<TagLeftIcon boxSize="12px" as={FiEdit2} />
					<TagLabel>Drawing</TagLabel>
				</Tag>
			);

		case 'words':
			return (
				<Tag size="sm" colorScheme="purple">
					<TagLeftIcon boxSize="12px" as={FiBook} />
					<TagLabel>Words</TagLabel>
				</Tag>
			);

		case 'coop':
			return (
				<Tag size="sm" colorScheme="teal">
					<TagLeftIcon boxSize="12px" as={FiUsers} />
					<TagLabel>Co-op</TagLabel>
				</Tag>
			);

		case 'trivia':
			return (
				<Tag size="sm" colorScheme="green">
					<TagLeftIcon boxSize="12px" as={BiQuestionMark} />
					<TagLabel>Trivia</TagLabel>
				</Tag>
			);

		case 'action':
			return (
				<Tag size="sm" colorScheme="red">
					<TagLeftIcon boxSize="12px" as={BiRocket} />
					<TagLabel>Action</TagLabel>
				</Tag>
			);

		case 'funny':
			return (
				<Tag size="sm" colorScheme="cyan">
					<TagLeftIcon boxSize="12px" as={BiLaugh} />
					<TagLabel>Funny</TagLabel>
				</Tag>
			);

		case 'personal':
			return (
				<Tag size="sm" colorScheme="yellow">
					<TagLeftIcon boxSize="12px" as={BiUser} />
					<TagLabel>Personal</TagLabel>
				</Tag>
			);

		default:
			return (
				<Tag size="sm" colorScheme="blue">
					<TagLeftIcon boxSize="12px" as={FiBookmark} />
					<TagLabel>{type}</TagLabel>
				</Tag>
			);
	}
}


export default function GameTags({ tags }) {
	return (
		<Wrap spacing="5px" justify="center" m="3" mt="0">
			{ tags && tags.map(tag => (
				<WrapItem key={tag}>
					<GameTag type={tag} />
				</WrapItem>
			))}
		</Wrap>
	)
}