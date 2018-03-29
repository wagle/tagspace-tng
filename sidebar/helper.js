function loadStyle(source, callback) {
  var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', source);
  link.onload = callback;
  document.head.appendChild(link);
}

function loadScript(source) {
  var script = document.createElement('script');
  script.setAttribute('src', source);
  script.async = false;
  document.head.appendChild(script);
}

function loadScriptsAndStyles(source) {
  loadStyle('styles.css', function() {
    loadScript('react-virtualized.js');
    loadScript(source);
  });
}

function loadReact() {
  loadScript(`react.min.js`);
  loadScript(`react-dom.min.js`);
}
