/**
 * Handles all system related javascript functions
 */


/** NPROGRESS DEFINED FUNCTIONS */
$(document).ajaxStart(function() {
    NProgress.inc(0.2);
});
$(document).ajaxStop(function() {
    NProgress.done();
});
function startLoad() {
    NProgress.inc(0.2);
}
function stopLoad() {
    NProgress.done(true);
}

/**
 * Custom error display functions
 * using Noty.js to display errors/success/warnings/info
 */

// shows success msg (green)
function showSuccess(msg) {
    noty({
        text: msg,
        theme: 'relax',
        layout: 'bottom',
        type: 'success',
        timeout: 3000,
        animation: {
            open: {height: 'toggle'},
            close: {height: 'toggle'},
            easing: 'swing',
            speed: 500
        }
    });
}

// shows information msg (blue)
function showInfo(msg) {
    noty({
        text: msg,
        theme: 'relax',
        layout: 'bottom',
        type: 'information',
        timeout: 3000,
        animation: {
            open: {height: 'toggle'},
            close: {height: 'toggle'},
            easing: 'swing',
            speed: 500
        }
    });
}

// shows warning msg (yellow)
function showWarning(msg) {
    noty({
        text: msg,
        theme: 'relax',
        layout: 'bottom',
        type: 'warning',
        timeout: 3000,
        animation: {
            open: {height: 'toggle'},
            close: {height: 'toggle'},
            easing: 'swing',
            speed: 500
        }
    });
}

// shows success msg (red)
function showError(msg) {
    noty({
        text: msg,
        theme: 'relax',
        layout: 'bottom',
        type: 'error',
        timeout: 3000,
        animation: {
            open: {height: 'toggle'},
            close: {height: 'toggle'},
            easing: 'swing',
            speed: 500
        }
    });
}

function confirmUser(msg) {
    var key = confirm(msg);
    return key;
}

function promptUser(msg) {
    var key = prompt(msg);
    return key;
}