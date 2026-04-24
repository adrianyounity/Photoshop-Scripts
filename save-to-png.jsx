(function () {
  if (!app.documents.length) {
    alert("No document open!");
    return;
  }

  var doc = app.activeDocument;
  var outputFolder = doc.path;

  // sanitize filename for saving
  function sanitizeName(name) {
    return name.replace(/[:\/\\\*\?\"<>\|]/g, "_").replace(/^\s+|\s+$/g, "");
  }

  // use document name (without extension)
  var docNameNoExt = doc.name.replace(/\.[^\.]+$/, "");
  var safeName = sanitizeName(docNameNoExt);

  // Save for Web options — PNG only
  var sfwOptions = new ExportOptionsSaveForWeb();
  sfwOptions.format = SaveDocumentType.PNG;
  sfwOptions.PNG8 = false; // PNG-24
  sfwOptions.transparency = true;
  sfwOptions.interlaced = false;

  try {
    // save as PNG in the same folder
    var pngFile = new File(outputFolder + "/" + safeName + ".png");
    doc.exportDocument(pngFile, ExportType.SAVEFORWEB, sfwOptions);
  } catch (err) {
    alert("Export failed: " + err.message);
  }
})();
