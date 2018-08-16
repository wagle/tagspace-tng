const NUM_COLUMNS = 5;

/*
function defaultHeaderRenderer({dataKey, label, sortBy, sortDirection}) {
    const showSortIndicator = sortBy === dataKey;
    var children = [React.createElement(
        "span",
        { className: "ReactVirtualized__Table__headerTruncatedText", key: "label", title: label },
        label
    )];
    if (showSortIndicator) {
        children.push(React.createElement(SortIndicator, { key: "SortIndicator", sortDirection: sortDirection }));
    }

    return children;
}
*/

// var searching = browser.bookmarks.search({});
// searching.then(onFulfilled, onRejected);

// (async function() { // async function expression used as an IIFE
//     return await browser.bookmarks.search({});
// })().then(v => {
//     allBookmarks = v;
// });

// let allBookmarksPromise = browser.bookmarks.search({});
// let allBookmarkTagsPromise = browser.experiments.tags.getAllTags();
// Promise.all([allBookmarksPromise, allBookmarkTagsPromise]).then(onFulfilled, onRejected);

let allBookmarksPromise = browser.bookmarks.search({});
allBookmarksPromise.then(needTags, onRejected);

async function needTags(bookmarks) {
    allBookmarks = bookmarks;
    console.log("bookmarks: ", typeof bookmarks, bookmarks);
    let tagPromises = [];
    for (let i = 0; i < allBookmarks.length; i++) {
        if (allBookmarks[i].type === "bookmark") {
            tagPromises[i] = browser.experiments.tags.getTagsForURI(allBookmarks[i].url);
        } else {
            tagPromises[i] = Promise.resolve("n/a");
        }
    };
    Promise.all(tagPromises).then(gotTags, onRejected);
};
function gotTags(solidifiedTags) {
    for (let i = 0; i < solidifiedTags.length; i++) {
        allBookmarks[i].tags = solidifiedTags[i];
    };
    onFulfilled();
};
function rowGetter({index}) {
    let bookmark = allBookmarks[index];
    console.log("bookmark: ", typeof bookmark, bookmark);
    console.log("bookmark url: ", typeof bookmark.url, bookmark.url);
//    let rowval = [index, bookmark.id, bookmark.title, bookmark.url, bookmark.type];
    let rowval = [bookmark.tags, bookmark.id, bookmark.title, bookmark.url, bookmark.type];
    return rowval;
}
function onRejected(error) {
    console.log(`An error: ${error}`);
    console.log(error);
    return {0:0};
}

function onFulfilled(values) {
    // allBookmarks = values;
    console.log(`bookmarks: ${allBookmarks.length}`);
    var App = React.createClass({
        render: function () {
            const flexColumns = [];

            flexColumns.push(
                React.createElement(ReactVirtualized.Column, {
                    dataKey: 0,
                    key: 0,
                    label: "tags",
                    width: 100,
                }),
            );
            flexColumns.push(
                React.createElement(ReactVirtualized.Column, {
                    dataKey: 1,
                    key: 1,
                    label: "id",
                    width: 100,
                }),
            );
            flexColumns.push(
                React.createElement(ReactVirtualized.Column, {
                    dataKey: 2,
                    key: 2,
                    label: "title",
                    width: 100,
                }),
            );
            flexColumns.push(
                React.createElement(ReactVirtualized.Column, {
                    dataKey: 3,
                    key: 3,
                    label: "url",
                    width: 100,
                }),
            );
            flexColumns.push(
                React.createElement(ReactVirtualized.Column, {
                    dataKey: 4,
                    key: 4,
                    label: "type",
                    width: 60,
                }),
            );

            return React.createElement(ReactVirtualized.AutoSizer, null, function (
                params,
            ) {
                return React.createElement(
                    ReactVirtualized.Table,
                    {
                        height: params.height,
                        overscanRowCount: 0,
                        rowGetter,
                        rowHeight: 15,
                        rowCount: allBookmarks.length,
                        width: params.width,
                        headerHeight: 21,
                        flexGrow: 1,
                        headerStyle: {
                            backgroundColor: 'lightgreen',
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: 'black',
                        },
                    },
                    null,
                    flexColumns,
                );
            });
        },
    });

    ReactDOM.render(React.createElement(App), document.querySelector('#mount'));
};
