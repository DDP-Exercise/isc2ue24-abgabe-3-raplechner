"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    // TODO: Select all 6 links (<a>) in the thumbnail section. They contain the URLs to the full images.
    let allLinks = document.querySelectorAll(".card-link");
    console.log("allLinks:", allLinks)
    // TODO: Select a random entry out of these 6.
    let randomEntryNumber = Math.floor(Math.random() * allLinks.length);
    let randomLink = allLinks[randomEntryNumber];
    console.log("random Link:", randomLink)
    // TODO: Implement switchFullImage() below.
    // Implemented
    // TODO: Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail (it contains the description).
    console.log("randomLink:", randomLink);
    let randomImage = randomLink.querySelector("img");
    console.log("randomImage:", randomImage);
    let randomImageUrl = randomLink.getAttribute("href");
    let randomImageAlt = randomImage.getAttribute("alt");
    console.log("randomImageUrl:", randomImageUrl);
    console.log("randomImageAlt:", randomImageAlt);
    switchFullImage(randomImageUrl, randomImageAlt);
    // TODO: Set a background color (classes .bg-dark and .text-white) to the card-body of your random image (hint: it's the sibling element of your link).
    let cardBody = randomLink.nextElementSibling;
    cardBody.classList.add("bg-dark", "text-white");
}

/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
function prepareLinks() {
    // TODO: Select all the 6 links (<a>) in the thumbnail section.
    let allLinks = document.querySelectorAll(".card-link");
    // TODO: Set an event listener for the click event on every <a> element.
    //  (or advanced: think of a way to do it with one single handler)
    allLinks.forEach(function(link) {
        link.addEventListener("click", function (event) {
            // TODO: The callback of the listener should do the following things:
            //  - Remove the .bg-dark and .text-white classes from the card where it's currently set.
            let cardBodiesActive = document.querySelectorAll("a+.bg-dark");
            cardBodiesActive.forEach(function(cardBody) {
                cardBody.classList.remove("bg-dark", "text-white");
            });
            //  - Add both classes again to the card where the click happened (hint: "this" contains the very <a> element, where the click happened).
            let cardBody = this.nextElementSibling;
            cardBody.classList.add("bg-dark", "text-white");
            //  - Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail.
            let imageChild = this.children[0];
            let ImageUrl = this.getAttribute("href");
            let ImageAlt = imageChild.getAttribute("alt");
            switchFullImage(ImageUrl, ImageAlt);
            //  - Implement and then call loadNotes() with the key for the current image (hint: the full image's URL makes an easy and unique key).
            loadNotes(ImageUrl);
            //  - Prevent the default action for the link (we don't want to follow it).
            event.preventDefault();
        });
    });
}
/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
    // TODO: Select the notes field and add a blur listener.
    let noteField = document.getElementById("notes");
    noteField.addEventListener("blur", function() {
        // TODO: When the notes field loses focus, store the notes for the current image in the local storage.
        let notes = noteField.textContent.trim();
        // TODO: Choose an appropriate key (hint: the full image's URL makes an easy and unique key).
        let key = document.querySelector("#fullImage img").getAttribute("src");

        // TODO: If the notes field is empty, remove the local storage entry.
        if (notes === "") {
            localStorage.removeItem(key);
        } else {
            // Store the notes in the local storage with the chosen key
            localStorage.setItem(key, notes);
        }

    });
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
    console.log("Image URL:", imageUrl);
    console.log("Image Description:", imageDescription);

    // TODO: Get the <img> element for the full image. Select it by its class or tag name.
    let fullImage = document.querySelector("#fullImage img");
    // TODO: Set its src and alt attributes with the values from the parameters (imageUrl, imageDescription).
    fullImage.setAttribute("src", imageUrl);
    fullImage.setAttribute("alt", imageDescription);
    // TODO: Select the <figcaption> element.
    let figcaptionElement = document.querySelector("#fullImage .figure-caption");
    // TODO: Set the description (the one you used for the alt attribute) as its text content.
    figcaptionElement.textContent = imageDescription;
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
    // TODO: Select the notes field.
    let noteField = document.getElementById("notes");
    // TODO: Check the local storage at the provided key.
    let noteContent = localStorage.getItem(key);
    //  - If there's an entry, set the notes field's HTML content to the local storage's content.
    if (noteContent) {
        noteField.innerHTML = noteContent;
    } else {
        //  - If there's no entry, set the default text "Enter your notes here!"
        noteField.innerHTML = "Enter your notes here!";
    }
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
/* function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}*/

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
