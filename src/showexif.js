$(function() {

	var showExifBtn = $('<div style="cursor:pointer;display:none;position:absolute;width:30px;height:30px;text-align:center;line-height:30px;background:#333;color:#fff;font-size:12px;z-index:9999">EXIF</div>');

	showExifBtn.appendTo('body');

	var currentImg = null;
	var speed = 50;
	var timer = false;

	$('body').on('mouseover', 'img', function() {
		clearTimeout(timer);
		timer = null;
		currentImg = this;
		var offset = $(this).offset();
		showExifBtn.css({
			top: offset.top + 'px',
			left: offset.left - 30 + 'px'
		});
		showExifBtn.show();
	});

	$('body').on('mouseout', 'img', function() {
		timer = setTimeout(function() {
			showExifBtn.hide();
		},
		speed);
	});

	showExifBtn.mouseover(function() {
		clearTimeout(timer);
		timer = null;
	});

	showExifBtn.mouseout(function() {
		timer = setTimeout(function() {
			showExifBtn.hide();
		},
		speed);
	});

	showExifBtn.click(function() {
		var exifWindow = window.open('about:blank', "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=400, height=400");
		exifWindow.document.write('<p id="loading">加载中...</p>');
		EXIF.getData(currentImg, function(img) {
			var x = EXIF.getAllTags(currentImg);
			var str = '';
			for (var key in x) {
				str += '<p style="line-height:160%; font-size:12px; "><b style="color:#666">' + key + '</b> : ' + x[key] + '</p>';
			}
			if (str == '') str = '无EXIF信息';
			exifWindow.document.getElementById('loading').innerHTML = '<a href="' + currentImg.src + '">原图链接</a>';
			exifWindow.document.write(str);
		});

	});

});

