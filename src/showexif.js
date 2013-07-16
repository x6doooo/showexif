$(function(){

  var showExifBtn = $('<div style="cursor:pointer;display:block;position:absolute;width:15px;height:15px;text-align:center;line-height:15px;background:#333;color:#fff;font-size:12px;z-index:99999">E</div>');

  var currentImg = null;
  var timer = null;

  $('body').on('mouseover', 'img', function(){
    currentImg = this;
    var offset = $(this).offset();
    showExifBtn.css({
      top: offset.top + 'px',
      left: offset.left - 15  + 'px'
    });
    showExifBtn.appendTo('body');
  }); 

  showExifBtn.click(function(){
  
    var exifWindow = window.open('about:blank',"_blank","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400");

    exifWindow.document.write('<p id="loading">加载中...</p>');

    EXIF.getData(currentImg, function(img){
      var x = EXIF.getAllTags(currentImg);

      var str = '';
      for(var key in x){
        str += '<p style="line-height:160%; font-size:12px; "><b style="color:#666">' + key + '</b> : ' + x[key] + '</p>';
      }

      if(str == '') str = '无EXIF信息';
      exifWindow.document.getElementById('loading').innerHTML = '<a href="' + currentImg.src + '">原图链接</a>';
      exifWindow.document.write(str);
    });
  
  });

});