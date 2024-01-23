document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.querySelectorAll('.open-modal');
    const modalElem = document.querySelector('.wp-block-udemy-plus-auth-modal');
    const modalClosedEl = document.querySelectorAll(
        '.modal-overlay, .modal-btn-close'
    );

    openModalBtn.forEach(el => {
        el.addEventListener('click', event => {
            event.preventDefault();
            modalElem.classList.add('modal-show');
        });
    })

    modalClosedEl.forEach(el => {
        el.addEventListener('click', event => {
            event.preventDefault();
            console.log('click');
            modalElem.classList.remove('modal-show');
        })
    })

    const tabs = document.querySelectorAll('.tabs a');
    const signinForm = document.querySelector('#signin-tab');
    const signupForm = document.querySelector('#signup-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', event => {
            event.preventDefault();

            tabs.forEach(curTab => {
                curTab.classList.remove('active-tab');
            });

            event.currentTarget.classList.add('active-tab');

            const activeTab = event.currentTarget.getAttribute('href');

            if(activeTab === '#signin-tab') {
                signupForm.style.display = 'none';
                signinForm.style.display = 'block';
            } else {
                signupForm.style.display = 'block';
                signinForm.style.display = 'none';
            }
        });
    });

    if(signinForm !== null) {
        signinForm.addEventListener('submit', async e => {
            e.preventDefault();
            const signinFieldset = signinForm.querySelector('fieldset');
            signinFieldset.setAttribute('disabled', true);

            const signinStatus = signinForm.querySelector('#signin-status');
            signinStatus.innerHTML = `
            <div class="modal-status modal-status-info">
                Please wait!     
            </div>
        `;

            const formData = {
                'user-login': signinForm.querySelector('#si-email').value,
                password: signinForm.querySelector('#si-password').value
            };

            const response = await fetch(up_auth_rest.signin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseJSON = await response.json();

            if(responseJSON.status === 2) {
                signinStatus.innerHTML = `
            <div class="modal-status modal-status-success">
                Success! You have been logged in.
            </div>`;
                location.reload();
            } else {
                signinFieldset.removeAttribute('disabled');
                signinStatus.innerHTML = ` 
            <div class="modal-status modal-status-danger">
                Unable to login! Please try again.
            </div>`;
            }
        });
    }

    if(signupForm !== null) {
        signupForm.addEventListener('submit', async e => {
            e.preventDefault();
            const signupFieldset = signupForm.querySelector('fieldset');
            signupFieldset.setAttribute('disabled', true);

            const signupStatus = signupForm.querySelector('#signup-status');
            signupStatus.innerHTML = `<div class="modal-status modal-status-info">
            Please wait! Account is being created.
       </div>`;

            const formData = {
                username: signupForm.querySelector('#su-name').value,
                email: signupForm.querySelector('#su-email').value,
                password: signupForm.querySelector('#su-password').value,
            };

            const response = await fetch(up_auth_rest.signup, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseJSON = await response.json();

            if (responseJSON.status === 2) {
                signupStatus.innerHTML = `
            <div class="modal-status modal-status-success">
                Success! Your account has been created.
            </div>`;

                location.reload();
            } else {
                signupFieldset.removeAttribute('disabled');
                signupStatus.innerHTML = `
            <div class="modal-status modal-status-danger">
                Unable to create an account! Please try again.
            </div>`;
            }
        });
    }
});
