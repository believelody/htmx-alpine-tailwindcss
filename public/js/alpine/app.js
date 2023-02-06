import { default as Alpine } from 'https://cdn.skypack.dev/alpinejs';
import drawer from './x-data/drawer.js';
import notifier from './x-data/notifier.js';

Alpine.data('drawer', drawer);
Alpine.data('notifier', notifier);

window.Alpine = Alpine;

window.Alpine.start();