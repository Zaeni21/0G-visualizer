// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk mengambil data transaksi dari API
    function fetchTransactionData() {
        fetch('https://chainscan-test.0g.ai/open/statistics/transaction?sort=DESC&skip=0&limit=10', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            const transactions = data.result.list;
            displayTransactions(transactions);
        })
        .catch(error => {
            console.error('Error fetching transaction data:', error);
        });
    }

    // Fungsi untuk menampilkan transaksi dalam grid
    function displayTransactions(transactions) {
        const container = document.getElementById('transaction-grid');
        container.innerHTML = '';  // Reset grid

        transactions.forEach(tx => {
            const transactionElement = document.createElement('div');
            transactionElement.classList.add('transaction-box');
            
            // Ukuran kotak berdasarkan jumlah transaksi
            const size = Math.sqrt(tx.count) * 2;  // Skala ukuran kotak
            const color = tx.count > 500000 ? '#FF5722' : '#4CAF50';

            // Mengatur ukuran kotak dan warna
            transactionElement.style.width = `${size}px`;
            transactionElement.style.height = `${size}px`;
            transactionElement.style.backgroundColor = color;

            // Menambahkan informasi ke dalam kotak
            transactionElement.innerHTML = `
                <h4>${tx.statTime}</h4>
                <p>Tx Count: ${tx.count}</p>
            `;

            // Menambahkan event klik untuk detail transaksi
            transactionElement.addEventListener('click', () => {
                alert(`Date: ${tx.statTime}\nTransaction Count: ${tx.count}`);
            });

            container.appendChild(transactionElement);
        });
    }

    fetchTransactionData();  // Ambil data transaksi saat halaman dimuat
});
