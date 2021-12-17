// ========== [///// MAIN /////] ==========
// ----- load components -----
$(document).ready(() => {
    console.log("loading components . . .")
    // widgets
    $('#notes-widget').load("html/notes-widget.html");
    $('#music-widget').load("html/music-widget.html");

    // custom icons
    $('.folder-icon').load("html/icons-custom/folder-icon.html");
});

