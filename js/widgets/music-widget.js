// ========== [///// FUNCTIONS /////] ==========
async function getMusic() {
    // ----- get note groups data arr -----
    let response = await API.request("music/");

    return response.data;
}


// ========== [///// MAIN /////] ==========
// ----- make music list -----
let music = getMusic();
music.then(
    (arr) => {
        $('.music-list').empty();

        arr.forEach(music => {
            // ----- make a new list item -----
            let newMusicListItem = $(`
                <img
                    id="m${music.id}"
                    class="list-item"
                    artist="${music.artist}"
                    song="${music.song}"
                    src="${music.imgUrl}"
                    alt=""
                    >
                </img>
            `)

            // ----- add to list -----
            $('.music-list').append(newMusicListItem);
        });
    },
    (err) => { console.log(err) }
)

// ----- event delgation: music list items -----
$('.music-list').click((e) => {
    // skip if clicked on background
    if (e.target.attributes.class.value == "bottom-bar music-list") { return }

    // assign artist data to info for clicked srtist
    $('#music-widget').find('.artist-name').html(`${e.target.attributes.artist.value}`);
    $('#music-widget').find('.song-title').html(`${e.target.attributes.song.value}`);
    $('#music-widget').find('.artist-img').attr('src', `${e.target.attributes.src.value}`);
    $('#music-widget').find('.artist-img').css("animation", "none");
})