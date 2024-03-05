fetch("./data.json")
    .then(response => response.json())
    .then(classes => loadClasses(classes));

function loadClasses(classes) {
    var classesCard = document.getElementById("col");

    var cards = [];

    for (let i = 0; i < classes.length; i++) {
        let add = "add" + i.toString();
        let card = "card" + i.toString();

        let term = classes[i].term;
        let deptCode = classes[i].deptCode;
        let classNumber = classes[i].classNumber;
        let classTitle = classes[i].classTitle;
        let courseCatalog = classes[i].courseCatalog;
        let image = classes[i].image;

        // create a new HTML div division
        let addCard = document.createElement("div");

        // add class = “col” to new division for Bootstrap
        addCard.classList.add("col");

        // create Bootstrap card
        addCard.innerHTML = `
            
                <div id="${card}" class="card shadow-sm">
                    <img src=${image} class="card-img-top" alt="..."></img>
                    <div class="card-body m-0">
                        <div class="row">
                            <a href="${courseCatalog}" target="_blank" class="col-md text-decoration-none">
                                <h1 class="fs-4 fw-bolder">${deptCode} ${classNumber}</h1>
                            </a>
                            <p class="col-sm text-end fs-6 fw-light">${term}</p>
                        </div>
                        <p>${classTitle}</p>
                        <div class="btn-group">
                            <button id=${add} type="button" class="btn btn-sm btn-outline-secondary">Add</button>
                        </div>
                    </div>
                </div>
            </a>
            `;

        // append new division
        classesCard.appendChild(addCard);

        let addBtn = document.getElementById(add);
        addBtn.addEventListener('click', () => {
            let existingCookie = document.cookie.replace(/(?:(?:^|.*;\s*)myCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            let existingClasses = existingCookie ? JSON.parse(existingCookie) : [];

            // Check if the class already exists in the cookie
            let classExists = existingClasses.some(obj => JSON.stringify(obj) === JSON.stringify(classes[i]));

            // Add the new JSON object to the existing classes if it doesn't exist
            if (!classExists) {
                existingClasses.push(classes[i]);

                // Set the updated cookie value
                document.cookie = 'myCookie=' + JSON.stringify(existingClasses) + ';';

                addBtn.style.backgroundColor = "red";
                addBtn.style.color = "white";
                addBtn.style.cursor = "not-allowed";
                addBtn.removeEventListener('click', () => { });
            } else {
                console.log("Can't add the same class");
            }
        });

        let ccard = document.getElementById(card);
        cards.push(ccard);
    }
}