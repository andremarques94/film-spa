import homeView from '../view/homeView.js';
import filmService from '../service/filmService.js';

export function init() {
    homeView.render(filmService.getFilm);
}
