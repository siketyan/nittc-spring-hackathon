import html from './index.html';

import './styles/normalize.css';
import './styles/app.scss';

window.addEventListener('DOMContentLoaded', () => {
    document.getElementsByTagName('body')[0].innerHTML = html;
});
