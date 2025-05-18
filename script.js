// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk mengambil data transaksi secara live
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
            createChart(transactions);
        })
        .catch(error => {
            console.error('Error fetching transaction data:', error);
        });
    }

    // Fungsi untuk menampilkan transaksi
    function displayTransactions(transactions) {
        const container = document.getElementById('transaction-container');
        container.innerHTML = ''; // Reset kontainer untuk memperbarui data

        transactions.forEach(tx => {
            const txElement = document.createElement('div');
            txElement.classList.add('transaction-box');
            txElement.innerHTML = `
                <h3>Date: ${tx.statTime}</h3>
                <p class="amount">Transaction Count: ${tx.count}</p>
            `;
            container.appendChild(txElement);
        });
    }

    // Fungsi untuk membuat grafik
    function createChart(transactions) {
        const ctx = document.getElementById('transactionChart').getContext('2d');
        const labels = transactions.map(tx => tx.statTime);  // Tanggal transaksi
        const data = transactions.map(tx => tx.count);  // Jumlah transaksi

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Transaction Count',
                    data: data,
                    borderColor: 'rgb(75, 192, 192)',
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Count'
                        }
                    }
                }
            }
        });
    }

    // Polling setiap 5 detik untuk memperbarui data
    setInterval(fetchTransactionData, 5000);  // Memanggil fetch setiap 5 detik

    // Ambil data transaksi saat pertama kali halaman dimuat
    fetchTransactionData();
});
