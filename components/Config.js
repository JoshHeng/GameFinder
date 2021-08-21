import { Heading, Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, FormControl, FormLabel, RadioGroup, Radio, Stack, Icon, Checkbox, CheckboxGroup } from '@chakra-ui/react';
import { FiUsers, FiSmile, FiBookmark } from 'react-icons/fi';
import { BiInfinite } from 'react-icons/bi';
import { GameTag } from './GameTags';

export default function Config({ config, setConfig }) {
	function setSetting(name, val) {
		return setConfig(config => {
			const _config =  Object.assign({}, config);
			_config[name] = val
			return _config;
		});
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
			</form>
		</Box>
	)
}