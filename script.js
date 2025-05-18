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
            displayTransactions(transactions);  // Menampilkan transaksi di grid
        })
        .catch(error => {
            console.error('Error fetching transaction data:', error);
        });
    }

    // Fungsi untuk menampilkan transaksi dalam grid
    function displayTransactions(transactions) {
        const container = document.getElementById('transaction-grid');
        container.innerHTML = '';  // Reset grid sebelum menambah data baru

        const width = container.offsetWidth;
        const height = window.innerHeight;

        // Set up SVG canvas dengan D3.js
        const svg = d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        // Scales for size
        const sizeScale = d3.scaleSqrt()
            .domain([0, d3.max(transactions, d => d.count)])
            .range([10, 200]);  // Min size 10px, max size 200px

        // Create rectangles for each transaction
        svg.selectAll('.transaction')
            .data(transactions)
            .enter()
            .append('rect')
            .attr('class', 'transaction-box')
            .attr('x', (d, i) => (i % 10) * 210)  // Grid layout (10 columns)
            .attr('y', (d, i) => Math.floor(i / 10) * 210)
            .attr('width', d => sizeScale(d.count))
            .attr('height', d => sizeScale(d.count))
            .attr('fill', d => d.count > 500000 ? '#FF5722' : '#4CAF50')
            .on('click', (event, d) => {
                alert(`Date: ${d.statTime}\nTransaction Count: ${d.count}`);
            })
            .append('title')
            .text(d => `Date: ${d.statTime}\nTx Count: ${d.count}`);
    }

    // Polling setiap 5 detik untuk memperbarui data
    setInterval(fetchTransactionData, 5000);  // Memanggil fetch setiap 5 detik

    // Ambil data transaksi saat pertama kali halaman dimuat
    fetchTransactionData();
});
