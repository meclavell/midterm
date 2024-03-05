let json = document.cookie.split("=")[1];
loadClasses(JSON.parse(json));

function loadClasses(classes) {
    var classesCard = document.getElementById("col");

    var cards = [];

    for (let i = 0; i < classes.length; i++) {
        let remove = "add" + i.toString();
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
                            <a href="${courseCatalog}" target="_blank" class="col-md">
                                <h1 class="fs-5">${deptCode} ${classNumber}</h1>
                            </a>
                            <p class="col-sm text-end">${term}</p>
                        </div>
                        <p>${classTitle}</p>
                        <div class="btn-group">
                            <button id=${remove} type="button" class="btn btn-sm btn-outline-secondary">Remove</button>
                        </div>
                    </div>
                </div>
            </a>
            `;

        // append new division
        classesCard.appendChild(addCard);

        let removeBtn = document.getElementById(remove);
        removeBtn.addEventListener('click', () => {
            // Find the index of the class to remove
            let indexToRemove = classes.findIndex(obj => obj.deptCode === deptCode && obj.classNumber === classNumber);

            if (indexToRemove !== -1) {
                // Remove the class from the array
                classes.splice(indexToRemove, 1);

                // Update the cookie with the modified classes array
                document.cookie = 'myCookie=' + JSON.stringify(classes) + ';';

                // Remove the card from the UI
                classesCard.removeChild(addCard);
            }
        });

        let ccard = document.getElementById(card);
        cards.push(ccard);
    }
}
