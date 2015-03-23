var addressSpace	= [
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
	'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
	'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E',
	'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
	'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

function generateGuid (length) {
	var a	= new Uint8Array(length);
	crypto.getRandomValues(a);

	return Array.prototype.slice.call(a).
		map(function (n) { return addressSpace[n % addressSpace.length] }).
		join('')
	;
}
