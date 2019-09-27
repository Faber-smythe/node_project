let dateFormat = require('dateformat');


let editMovie = (res, result) => {
    let date = dateFormat(result[0].date, "yyyy-mm-dd");
    let id = result[0].id;
    res.send(`

    <script>

    function jsonparse(event){
        event.preventDefault();

        let title_input = document.querySelector("#title");
        let date_input = document.querySelector("#creation_date");

        let data = JSON.stringify({"id" : ${id}, "title" : title_input.value, "creation_date" : date_input.value}) ;

        let xhr = new XMLHttpRequest();
        let url = "../edit-movie/${id}";
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
    <h2>Edit a movie in the database </h2>


    <form method="post" action="./new-movie" onSubmit="jsonparse(event)">

        <label for="title">Title</label>
        <input type="texte" id="title" name="title"value="${result[0].title}"></input>

        <label for="creation_date">Creation date</label>
        <input type="date" id="creation_date" name="creation_date" value="${date}"></input>

        <input type="submit" value="Send" />    
    </form>

    <br>
    <a href="./list">Back to the list</a>
    
    `);
}

module.exports = {editMovie};
