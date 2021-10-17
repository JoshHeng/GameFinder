import { useMemo } from 'react';
import { Heading, Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, FormControl, FormLabel, RadioGroup, Radio, Stack, Icon, Checkbox, CheckboxGroup, Tag, TagLeftIcon, TagLabel } from '@chakra-ui/react';
import { FiUsers, FiSmile, FiBookmark, FiBox, FiGrid } from 'react-icons/fi';
import { BiInfinite } from 'react-icons/bi';
import { GameTag } from './GameTags';

export default function Config({ packs, config, setConfig }) {
	const packCategories = useMemo(() => {
		const categories = { misc: [] };

		packs.forEach(pack => {
			if (pack.category && !categories[pack.category]) categories[pack.category] = [];
			categories[pack.category || 'misc'].push(pack);
		})

		return Object.keys(categories).map(categoryKey => ({ name: categoryKey, packs: categories[categoryKey] }));
	}, [packs]);

	const packCategoryParentCheckboxes = useMemo(() => {
		return packCategories.map(category => {
			let chosenCount = category.packs.filter(pack => config.packs.includes(pack.id.toString())).length;
			if (chosenCount === category.packs.length) return 1;
			else if (chosenCount) return 2;
			else return 0;
		})
	}, [packCategories, config]);

	function setSetting(name, val) {
		return setConfig(config => {
			const _config =  Object.assign({}, config);
			_config[name] = val
			return _config;
		});
	}

	function onPackCategoryParentCheckboxChange(categoryId, enabled) {
		const category = packCategories[categoryId];
		let currentValue = config.packs || [];

		currentValue = currentValue.filter(packId => !category.packs.find(pack => pack.id.toString() === packId));
		if (enabled) currentValue = currentValue.concat(category.packs.map(pack => pack.id.toString()));

		return setSetting('packs', currentValue);
	}

	return (
		<Box borderWidth="1px" p="5" borderRadius="lg" mt="4" mb="4">
			<Heading as="h2" size="md" mb="3">Config</Heading>

			<form>
				<FormControl id="people">
					<FormLabel fontWeight="bold"><Icon as={FiUsers} mr="1" />People</FormLabel>
					<Slider value={config.people} min={0} max={20} onChange={val => setSetting('people', val)} aria-label="people">
						<SliderTrack bg="blue.100">
							<Box position="relative" right={10} />
							<SliderFilledTrack bg="blue.400" />
						</SliderTrack>
						<SliderThumb boxSize={6}>
							{ config.people || <Icon as={BiInfinite} /> }
						</SliderThumb>
					</Slider>
				</FormControl>

				<FormControl id="familyFriendly">
					<FormLabel fontWeight="bold"><Icon as={FiSmile} mr="1" />Family Friendly</FormLabel>
					<RadioGroup value={config.familyFriendly} onChange={val => setSetting('familyFriendly', val)}>
						<Stack spacing="5" direction="row" wrap="wrap">
							<Radio value="0" colorScheme="red">No</Radio>
							<Radio value="1" colorScheme="yellow">Optional</Radio>
							<Radio value="2" colorScheme="green">Yes</Radio>
						</Stack>
					</RadioGroup>
				</FormControl>

				<FormControl id="tags" mt="3">
					<FormLabel fontWeight="bold"><Icon as={FiBookmark} mr="1" />Tags</FormLabel>
					<CheckboxGroup value={config.tags} onChange={val => setSetting('tags', val)}>
						<Stack spacing="5" direction="row" wrap="wrap">
							<Checkbox value="drawing"><GameTag type="drawing" /></Checkbox>
							<Checkbox value="words"><GameTag type="words" /></Checkbox>
							<Checkbox value="coop"><GameTag type="coop" /></Checkbox>
							<Checkbox value="trivia"><GameTag type="trivia" /></Checkbox>
							<Checkbox value="action"><GameTag type="action" /></Checkbox>
							<Checkbox value="funny"><GameTag type="funny" /></Checkbox>
							<Checkbox value="personal"><GameTag type="personal" /></Checkbox>
							<Checkbox value="free"><GameTag type="free" /></Checkbox>
						</Stack>
					</CheckboxGroup>
				</FormControl>

				<FormControl id="packs" mt="3">
					<FormLabel fontWeight="bold"><Icon as={FiBox} mr="1" />Packs</FormLabel>
					<CheckboxGroup value={config.packs} onChange={val => setSetting('packs', val)}>
						<Stack spacing="2" direction="column">
							{ packCategories.map((category, i) => (
								<Stack spacing="5" direction="row" wrap="wrap" key={category.name}>
									{ category.name !== "misc" && 
										<Checkbox isChecked={packCategoryParentCheckboxes[i] === 1} isIndeterminate={packCategoryParentCheckboxes[i] === 2} onChange={e => onPackCategoryParentCheckboxChange(i, e.target.checked)}>
											<Tag mt="0.5" mb="0.5" colorScheme="blue">
												<TagLeftIcon boxSize="12px" as={FiGrid} />
												<TagLabel>{category.name}</TagLabel>
											</Tag>
										</Checkbox>
									}
									{ category.packs.map(pack => (
										<Checkbox value={pack.id.toString()} key={pack.id}>
											<Tag mt="0.5" mb="0.5" size="sm">{pack.shortName || pack.name || 'Misc'}</Tag>
										</Checkbox>
									))}
								</Stack>
							))}
						</Stack>
					</CheckboxGroup>
				</FormControl>
			</form>
		</Box>
	)
}