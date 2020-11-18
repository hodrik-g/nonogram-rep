function FillVec(vec, cell_chains, alignment) {

	let chains = cell_chains.reduce((accumulator, currentValue) => {
		return accumulator.push({chainLength: currentValue, cellsLeft: currentValue});
	}, []);

	if (alignment === 'right') {
		vec.reverse();
		cell_chains.reverse();
	}

	for (const index in vec) {

		if ( !chains[0] ) {
			vec[index] = 'empty';
			continue;
		}

		const cell = vec[index];

		switch (cell) {
			case undefined:
				if ( chains[0].cellsLeft === 0 ) {
					vec[index] = 'empty';
	
					chains.shift();
				} else {
					vec[index] = 'full';
	
					chains[0].cellsLeft--;
				}
				break;

			case 'empty':
				if ( 0 < chains[0].cellsLeft < chains[0].chainLength ) {

					for ( i in new Array(chains[0].chainLength - chains[0].cellsLeft) ) {
						const cellToClearIndex = index - i - 1;
						vec[cellToClearIndex] = undefined;
					}
					chains[0].cellsLeft = chains[0].chainLength;

				} else if (chains[0].cellsLeft === 0) {
					chains.shift();
				}
				break;

			case 'full':
				if ( chains[0].cellsLeft > 0 ) {
					chains[0].cellsLeft--;
				} else {
					const cellToClearIndex = index - chains[0].chainLength;
					vec[cellToClearIndex] = undefined;
				}
				break;

			default:
				console.log(`FillVec() -> switch -> cell === ${cell}`);
				break;
		}
	}

	return alignment === 'right' ?
		vec.reverse() :
		vec;
}

function VecResolver(vec, cell_chains) {
	const allChainsToLeftVec = FillVec(vec, cell_chains, 'left');
	const allChainsToRightVec = FillVec(vec, cell_chains, 'right');
	//verificar full cells da mesma sequencia em comum nas duas versões
	for (const cellIndex in vec) {
		const cell = vec[cellIndex];

		if ( allChainsToLeftVec[cellIndex] === 'full'
		&&   allChainsToRightVec[cellIndex] === 'full') {}
	}

	let chainsGoneL = 0, chainsGoneR = 0;
	vec.map((value, index, array) => {
		if ( value !== undefined ) return value;

		if ( allChainsToLeftVec[index] === 'full'
		&&   allChainsToRightVec[index] === 'full'
		&&   chainsGoneL === chainsGoneR) {

		}
	});
}