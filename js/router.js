import routes from './routes.js';

async function launchController(controllerName) {
    const controller = await import(`./controler/${controllerName}.js`);
    controller.init();
}

function getRoute(path) {
    return Object.keys(routes).find(key => routes[key].path === path);
}

function navigate(path, initialLoad = false) {
    const routeKey = getRoute(path);
    const route = routes[routeKey];

    initialLoad
        ? history.replaceState(route, '', route.path)
        : history.pushState(route, '', route.path);

    launchController(route.controller);
}

export function init() {
    const path = location.pathname;
    navigate(path, true);

    window.addEventListener('popstate', ({ state }) => {
        launchController(state.controller);
    });

    document.querySelectorAll('a').forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            navigate(elem.pathname);
        });
    });
}
