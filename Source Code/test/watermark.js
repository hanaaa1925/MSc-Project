function watermark() {
  //var watermark_txt = "Real Name";
  // default setting
  var defaultSettings = {
      watermark_txt: "Real Name",
      watermark_x: 20,              // start x position
      watermark_y: 20,              // start y position
      watermark_rows: 20,           // lines
      watermark_cols: 20,           // columns
      watermark_x_space: 30,        // space between x axis
      watermark_y_space: 10,        // space between y axis
      watermark_color: '#aaa',      // font color
      watermark_alpha: 0.4,         // transparency
      watermark_fontsize: '15px',   // font size
      watermark_font: 'Arial',    // font family
      watermark_width: 210,         // width
      watermark_height: 80,         // length
      watermark_angle: 20           // angle
  };
  if (arguments.length === 1 && typeof arguments[0] === "object") {
      var src = arguments[0] || {};
      for (key in src) {
          if (src[key] && defaultSettings[key] && src[key] === defaultSettings[key]) continue;
          else if (src[key]) defaultSettings[key] = src[key];
      }
  }
  var oTemp = document.createDocumentFragment();
  // Get page width. 
  var page_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
  var cutWidth = page_width * 0.0150;
  var page_width = page_width - cutWidth;
  // Get page height.
  var page_height = Math.max(document.body.scrollHeight, document.body.clientHeight) + 450;
  page_height = Math.max(page_height, window.innerHeight - 30);

  // If the watermark column number is set to 0, or the watermark column number is too large to exceed the maximum width of the page, the watermark column number and the watermark X-axis interval are recalculated
  if (defaultSettings.watermark_cols == 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width * defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {
      defaultSettings.watermark_cols = parseInt((page_width - defaultSettings.watermark_x + defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space));
      defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1));
  }

  // If the watermark line number is set to 0, or the watermark line number is too large to exceed the maximum page length, the watermark line number and the watermark Y-axis interval are recalculated
  if (defaultSettings.watermark_rows == 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {
      defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
      defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1));
  }
  var x;
  var y;
  for (var i = 0; i < defaultSettings.watermark_rows; i++) {
      y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
      for (var j = 0; j < defaultSettings.watermark_cols; j++) {
          x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;
          var mask_div = document.createElement('div');
          mask_div.id = 'mask_div' + i + j;
          mask_div.className = 'mask_div';
          mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));
          // Set the watermark div to tilt display
          mask_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.visibility = "";
          mask_div.style.position = "absolute";
          mask_div.style.left = x + 'px';
          mask_div.style.top = y + 'px';
          mask_div.style.overflow = "hidden";
          mask_div.style.zIndex = "9999";
          // The watermark does not block click events on the page
          mask_div.style.pointerEvents = 'none';
          mask_div.style.opacity = defaultSettings.watermark_alpha;
          mask_div.style.fontSize = defaultSettings.watermark_fontsize;
          mask_div.style.fontFamily = defaultSettings.watermark_font;
          mask_div.style.color = defaultSettings.watermark_color;
          mask_div.style.textAlign = "center";
          mask_div.style.width = defaultSettings.watermark_width + 'px';
          mask_div.style.height = defaultSettings.watermark_height + 'px';
          mask_div.style.display = "block";
          oTemp.appendChild(mask_div);
      };
  };
  document.body.appendChild(oTemp);
}

function getText() {
  var text = watermark_txt;
  console.log(123);
  return text;
}

function getNow() {
  var d = new Date();
  var year = d.getFullYear();
  var month = change(d.getMonth() + 1);
  var day = change(d.getDate());
  var hour = change(d.getHours());
  var minute = change(d.getMinutes());
  var second = change(d.getSeconds());

  function change(t) {
      if (t < 10) {
          return "0" + t;
      } else {
          return t;
      }
  }
  var time = hour + ':' + minute + ':' + second + "  " + day + '/' + month + '/' + year + ' ';
  return time;
}