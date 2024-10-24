let currentPage = 1;
const pageSize = 10;

async function fetchHighscores() {
    const topN = document.getElementById('topN').value || 10;
    const response = await fetch(`/highscores?topN=${topN}&page=${currentPage}`);
    const data = await response.json();

    // Populate the table
    const tbody = document.getElementById('highscoreTableBody');
    tbody.innerHTML = '';
    data.scores.forEach(score => {
        const row = `<tr>
            <td>${score.user_name}</td>
            <td>${score.score}</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    createPagination(data.totalPages);
}

function createPagination(totalPages) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.onclick = () => {
            currentPage = i;
            fetchHighscores();
        };
        paginationDiv.appendChild(button);
    }
}

fetchHighscores();
