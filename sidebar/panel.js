var myWindowId;
const contentBox = document.querySelector("#content");

var count = 0;

function populate() {
    var fastlist = E("list").widget;
    var values = [];
    for (var i = 0; i < 100000; i++) {
        values.push({
            from: "Fred",
            to: "Wilma",
            subject: "Jaba! " + (i + count + 1) + ". time",
            date: (i-3400) + "-03-01",
        });
    }
    fastlist.addEntriesFromArray(values);
    count += values.length;
}

function onLoad() {
    var button = document.getElementById('populate');
    //button.addEventListener('click', function () { alert('ONE') }, false);
    button.setAttribute('onclick', "alert('NOT CALLED')"); // event handler listener is registered here
    //button.addEventListener('click', function () { alert('THREE') }, false);
    button.onclick = populate;
    //button.addEventListener('click', function () { alert('FOUR') }, false);

    new Fastlist(E("list"));
    populate();
}
window.addEventListener("load", onLoad, false);

/*
/!*
Make the content box editable as soon as the user mouses over the sidebar.
*!/
window.addEventListener("mouseover", () => {
  contentBox.setAttribute("contenteditable", true);
});

/!*
When the user mouses out, save the current contents of the box.
*!/
window.addEventListener("mouseout", () => {
  contentBox.setAttribute("contenteditable", false);
  browser.tabs.query({windowId: myWindowId, active: true}).then((tabs) => {
    let contentToStore = {};
    contentToStore[tabs[0].url] = contentBox.textContent;
    browser.storage.local.set(contentToStore);
  });
});

/!*
Update the sidebar's content.

1) Get the active tab in this sidebar's window.
2) Get its stored content.
3) Put it in the content box.
*!/
function updateContent() {
  browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
      return browser.storage.local.get(tabs[0].url);
    })
    .then((storedInfo) => {
      contentBox.textContent = storedInfo[Object.keys(storedInfo)[0]];
    });
}

/!*
Update content when a new tab becomes active.
*!/
browser.tabs.onActivated.addListener(updateContent);

/!*
Update content when a new page is loaded into a tab.
*!/
browser.tabs.onUpdated.addListener(updateContent);

/!*
When the sidebar loads, get the ID of its window,
and update its content.
*!/
browser.windows.getCurrent({populate: true}).then((windowInfo) => {
  myWindowId = windowInfo.id;
  updateContent();
});
*/
