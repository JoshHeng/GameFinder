import { Heading, Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, FormControl, FormLabel, RadioGroup, Radio, Stack, Icon } from '@chakra-ui/react';
import { FiUsers, FiSmile } from 'react-icons/fi';

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
					<Slider value={config.people} min={1} max={20} onChange={val => setSetting('people', val)}>
						<SliderTrack bg="blue.100">
							<Box position="relative" right={10} />
							<SliderFilledTrack bg="blue.400" />
						</SliderTrack>
						<SliderThumb boxSize={6}>
							{ config.people }
						</SliderThumb>
					</Slider>
				</FormControl>
				<FormControl id="familyFriendly">
					<FormLabel fontWeight="bold"><Icon as={FiSmile} mr="1" />Family Friendly</FormLabel>
					<RadioGroup value={config.familyFriendly} onChange={val => setSetting('familyFriendly', val)}>
						<Stack spacing="5" direction="row">
							<Radio value="0" colorScheme="red">No</Radio>
							<Radio value="1" colorScheme="yellow">Optional</Radio>
							<Radio value="2" colorScheme="green">Yes</Radio>
						</Stack>
					</RadioGroup>
				</FormControl>
			</form>
		</Box>
	)
}