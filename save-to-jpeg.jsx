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

  // ✅ use document name (without extension)
  var docNameNoExt = doc.name.replace(/\.[^\.]+$/, "");
  var safeName = sanitizeName(docNameNoExt);

  // prepare Save for Web options
  var sfwOptions = new ExportOptionsSaveForWeb();
  sfwOptions.format = SaveDocumentType.JPEG;
  sfwOptions.includeProfile = true;
  sfwOptions.interlaced = false;
  sfwOptions.optimized = true;
  sfwOptions.quality = 100; // 0–100

  // export the visible document (composite view)
  try {
    // ✅ save as [document name].jpg in the same folder
    var jpegFile = new File(outputFolder + "/" + safeName + ".jpg");

    doc.exportDocument(jpegFile, ExportType.SAVEFORWEB, sfwOptions);
    // alert("Saved: " + jpegFile.fsName);
  } catch (err) {
    // alert("Error: " + err.message);
  }
})();

// save as selected layer of folder name
// #target photoshop

// (function () {
//     if (!app.documents.length) {
//         alert("No document open!");
//         return;
//     }

//     var doc = app.activeDocument;
//     var outputFolder = doc.path;
//  var sel = doc.activeLayer; // selected layer/group
//     // sanitize filename for saving
//     function sanitizeName(name) {
//         return name.replace(/[:\/\\\*\?\"<>\|]/g, "_").replace(/^\s+|\s+$/g, "");
//     }

//   var safeName = sanitizeName(sel.name || doc.name.replace(/\.[^\.]+$/, ""))
//     // prepare Save for Web options
//     var sfwOptions = new ExportOptionsSaveForWeb();
//     sfwOptions.format = SaveDocumentType.JPEG;
//     sfwOptions.includeProfile = true;
//     sfwOptions.interlaced = false;
//     sfwOptions.optimized = true;
//     sfwOptions.quality = 90; // 0–100

//     // export the visible document (composite view)
//     try {
//         var jpegFile = new File(outputFolder + "/" + safeName + ".jpg");
//         doc.exportDocument(jpegFile, ExportType.SAVEFORWEB, sfwOptions);
//         // alert("Saved: " + jpegFile.fsName);
//     } catch (err) {
//         alert("Error: " + err.message);
//     }
// })();
