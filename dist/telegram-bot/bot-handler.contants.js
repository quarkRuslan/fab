"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.padTo2Digits = exports.getNextListItem = exports.getPicturesItems = exports.getMusicItems = exports.picturesItems = exports.musicItems = exports.motherSongURL = exports.whenFootballToday = exports.howAreUAnswer = exports.whenFootball = exports.menu = exports.MenuActions = void 0;
var MenuActions;
(function (MenuActions) {
    MenuActions["listen"] = "\u0421\u043B\u0443\u0445\u0430\u0442\u044C \u041A\u043E\u0437\u0430\u0447\u0435\u043D\u043A\u0430";
    MenuActions["whenFootball"] = "\u0420\u0443\u0441\u043B\u0430\u043D\u0447\u0438\u043A\u0443, \u043A\u043E\u043B\u0438 \u043D\u0430\u0448i \u0433\u0440\u0430\u044E\u0442\u044C?";
    MenuActions["whenFootballToday"] = "\u041E \u043A\u043E\u0442\u0440i\u0439 \u0444\u0443\u0442\u0431\u043E\u043B \u0441\u044C\u043E\u0433\u043E\u0434\u043Di?";
    MenuActions["weatherTomorrow"] = "\u0428\u043E \u0442\u0430\u043C \u043F\u043E \u043F\u043E\u0433\u043E\u0434i?";
    MenuActions["doTrainings"] = "\u0420\u043E\u0431\u0438\u0442\u0438 \u0437\u0430\u0440\u044F\u0434\u043A\u0443";
    MenuActions["howAreYou"] = "\u042F\u043A \u0441\u043F\u0440\u0430\u0432\u0438?";
    MenuActions["missedChildren"] = "\u0421\u043A\u0443\u0447\u0438\u0432 \u0437\u0430 \u0434\u0456\u0442\u044C\u043C\u0438";
    MenuActions["motherSong"] = "\u0421\u043B\u0443\u0445\u0430\u0442\u044C \u201C\u041C\u0430\u043C\u043E, \u043C\u043E\u044F, \u043C\u0430\u043C\u043E\"";
})(MenuActions = exports.MenuActions || (exports.MenuActions = {}));
exports.menu = {
    'reply_markup': {
        'keyboard': [
            [{ text: MenuActions.howAreYou }, { text: MenuActions.weatherTomorrow, }, { text: MenuActions.whenFootball, }],
            [{ text: MenuActions.whenFootballToday }, { text: MenuActions.doTrainings }, { text: MenuActions.listen }],
            [{ text: MenuActions.missedChildren }, { text: MenuActions.motherSong }]
        ]
    }
};
exports.whenFootball = 'https://football.ua/club/186-ukraine.html';
exports.howAreUAnswer = 'Фердиперцево!';
exports.whenFootballToday = 'https://football.ua/tvschedule/live.html';
exports.motherSongURL = 'https://youtu.be/K7EZkKzplhE';
exports.musicItems = [
    'https://youtu.be/XPzAh5u5xgg',
    'https://www.youtube.com/watch?v=1i-mVOEChWY&feature=youtu.be',
    'https://youtu.be/QFRJ9xQx5dY'
];
exports.picturesItems = [
    './assets/images/photo_2022-07-02_11-32-55.jpg',
    './assets/images/photo_2022-07-02_11-32-56.jpg',
    './assets/images/photo_2022-07-02_11-32-56 (2).jpg',
    './assets/images/photo_2022-07-02_11-32-57.jpg',
    './assets/images/photo_2022-07-02_11-32-58.jpg'
];
let musicIndex = 0;
let missedChildrenIndex = 0;
function getMusicItems() {
    return getNextListItem(exports.musicItems, musicIndex, () => musicIndex++, () => musicIndex = 0);
}
exports.getMusicItems = getMusicItems;
function getPicturesItems() {
    return getNextListItem(exports.picturesItems, missedChildrenIndex, () => missedChildrenIndex++, () => missedChildrenIndex = 0);
}
exports.getPicturesItems = getPicturesItems;
function getNextListItem(itemsList, index, incrementIndex, resetIndex) {
    if (index === itemsList.length - 1) {
        resetIndex();
    }
    else {
        incrementIndex();
    }
    return itemsList[index];
}
exports.getNextListItem = getNextListItem;
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
exports.padTo2Digits = padTo2Digits;
function formatDate(date) {
    return ([
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':'));
}
exports.formatDate = formatDate;
