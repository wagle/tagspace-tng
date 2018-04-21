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

let allBookmarksPromise = browser.bookmarks.search({});
let allBookmarks = allBookmarksPromise.then(onFulfilled, onRejected);

function rowGetter({index}) {
    let bookmark = allBookmarks[index];
    let rowval = [index, bookmark.id, bookmark.title, bookmark.url, bookmark.type];
    return rowval;
}

function onRejected(error) {
    console.log(`An error: ${error}`);
    console.log(error);
    return {0:0};
}

function onFulfilled(bookmarkItems) {
    console.log(`length: ${bookmarkItems.length}`);
    allBookmarks = bookmarkItems;
    var App = React.createClass({
        render: function () {
            const flexColumns = [];

            flexColumns.push(
                React.createElement(ReactVirtualized.Column, {
                    dataKey: 0,
                    key: 0,
                    label: "row #",
                    width: 55,
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
