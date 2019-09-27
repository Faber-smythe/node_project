let list = (res, results) => {
    let table = `
    <table>
        <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>RELEASE</th>
        </tr>
    `
    results.forEach((movie) => {
        table = `${table} 
            <tr>
                <th>${movie.id}</th>
                <th>${movie.name}</th>
                <th>${movie.creation_date}</th>
            </tr>
        `;
    })

    table = `${table} </table>`;

    res.send(`

    <script>

    function jsonparse(event){
        event.preventDefault();

        let title_input = document.querySelector("#title");
        let date_input = document.querySelector("#creation_date");

        let data = JSON.stringify({"title" : title_input.value, "creation_date" : date_input.value}) ;

        let xhr = new XMLHttpRequest();
        let url = "./new-movie";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let json = JSON.parse(xhr.responseText);
            }
        };

        xhr.send(data);

    }
    
    </script>

    <h1>NODE API PROJECT </h1>
    <h2>Movie List :</h2>
    
        ${table};

    <a href="./">Add a movie</a>
    `);
}

module.exports = {list};
