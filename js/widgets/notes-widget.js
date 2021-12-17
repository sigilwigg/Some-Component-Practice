// ========== [///// FUNCTIONS /////] ==========
async function getNotesGroups() {
    // ----- get note groups data arr -----
    let response = await API.request("note-groups/");

    response.data.forEach(noteGroup => {
        // ----- make a new list item -----
        let newListItem = $(`
            <div class="list-item">
                <h2>${noteGroup.groupName}</h2>
                <p>${noteGroup.notesCount}</p>
            </div>
        `)

        // ----- add to list -----
        $('div[class="notes-list"]').append(newListItem);
    });
}


// ========== [///// MAIN /////] ==========
// ----- load components -----
$(document).ready(() => {
    // ----- load components -----
    $('.folder-icon').load("html/icons-custom/folder-icon.html");

    // ----- load notes list -----
    getNotesGroups();
});
