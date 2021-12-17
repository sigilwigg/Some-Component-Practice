$('form[id="login-form"]').submit(async (e) => {
    e.preventDefault();

    try {
        const name = $('#login-name').val();
        const password = $('login-password').val();

        await API.login(name, password);
    } catch (err) {
        console.error(err);
    }

})