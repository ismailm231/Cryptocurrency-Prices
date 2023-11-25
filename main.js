// Access HTML elements
const cryptoMenu = document.getElementById('cryptoMenu');
const cryptoInfo = {
    name: document.getElementById('name'),
    symbol: document.getElementById('symbol'),
    supply: document.getElementById('supply'),
    priceUsd: document.getElementById('priceUsd'),
    changePercent: document.getElementById('changePercent24Hr'),
};

// Function to update crypto information
function updateCryptoInfo(selectedCrypto) {
    if (selectedCrypto) {
        cryptoInfo.name.textContent = selectedCrypto.name;
        cryptoInfo.symbol.textContent = selectedCrypto.symbol;
        cryptoInfo.supply.textContent = Math.round(selectedCrypto.supply);

        const price = parseFloat(selectedCrypto.priceUsd);
        if (!isNaN(price)) {
            cryptoInfo.priceUsd.textContent = price.toFixed(2);
        } else {
            cryptoInfo.priceUsd.textContent = 'Unknown';
        }

        const percentDiff = parseFloat(selectedCrypto.changePercent24Hr);
        if (!isNaN(percentDiff)) {
            cryptoInfo.changePercent.textContent = percentDiff.toFixed(2);
        } else {
            cryptoInfo.changePercent.textContent = 'Unknown';
        }
    }
}


// Function to populate the dropdown with crypto id
function populateCryptoDropdown(cryptocurrencies) {
    cryptocurrencies.forEach(crypto => {
        cryptoMenu.add(new Option(crypto.name, crypto.id));
    });
}

// Function to fetch and process crypto data
function fetchAndProcessCryptoData() {
    fetch('https://api.coincap.io/v2/assets')
        .then(response => response.json())
        .then(data => {
            const cryptocurrencies = data.data;

            populateCryptoDropdown(cryptocurrencies);

            cryptoMenu.addEventListener('change', () => {
                const selectedCryptoID = cryptoMenu.value;
                const selectedCrypto = cryptocurrencies.find(crypto => crypto.id === selectedCryptoID);
                updateCryptoInfo(selectedCrypto);
            });
        })
        .catch(error => {
            console.error('An error occurred while fetching the data', error);
        });
}

// Fetch and display crypto data
fetchAndProcessCryptoData();


