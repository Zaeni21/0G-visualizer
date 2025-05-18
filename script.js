// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk mengambil data dari API
    function fetchTransactionData() {
        fetch('https://chainscan-test.0g.ai/open/statistics/transaction?sort=DESC&skip=0&limit=10', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            const transactions = data.data;
            displayTransactions(transactions);
        })
        .catch(error => {
            console.error('Error fetching transaction data:', error);
        });
    }

    // Fungsi untuk menampilkan transaksi dalam grid
    function displayTransactions(transactions) {
        const container = document.getElementById('transaction-container');
        container.innerHTML = ''; // Reset container sebelum menambah data baru

        transactions.forEach(tx => {
            const txElement = document.createElement('div');
            txElement.classList.add('transaction-box');

            txElement.innerHTML = `
                <h3>Tx ID: ${tx.txId}</h3>
                <p class="amount">Amount: ${tx.amount}</p>
                <p class="timestamp">Timestamp: ${new Date(tx.timestamp).toLocaleString()}</p>
            `;

            container.appendChild(txElement);
        });
    }

    // Ambil data transaksi saat halaman dimuat
    fetchTransactionData();
});
