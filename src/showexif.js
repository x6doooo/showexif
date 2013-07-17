$(function() {


  var exif_en2cn = {
    ExifVersion: 'EXIF版本',
    FlashpixVersion: 'Flashpix版本',
    ColorSpace: '色彩空间',
    PixelXDimension: '有效图像宽度',
    PixelYDimension: '有效图像高度',
    ComponentsConfiguration: '',
    CompressedBitsPerPixel: '图像压缩模式',
    MakerNote: '厂商注脚',
    UserComment: '用户注脚',
    RelatedSoundFile: '相关声音文件',
    DateTimeOriginal: '原创时间',
    DateTimeDigitized: '制成数码时间',
    SubsecTime: '',
    SubsecTimeOriginal: '',
    SubsecTimeDigitized: '',
    ExposureTime: '曝光时间',
    FNumber: '光圈',
    ExposureProgram: '曝光程度',
    SpectralSensitivity: '光谱敏感度',
    ISOSpeedRatings: 'ISO',
    OECF: '',
    ShutterSpeedValue: '快门速度',
    ApertureValue: '光圈',
    BrightnessValue: '光度',
    ExposureBias: '曝光偏压',
    MaxApertureValue: '最大光圈',
    SubjectDistance: '主体距离',
    MeteringMode: '测距模式',
    LightSource: '光源',
    Flash: '闪光灯',
    SubjectArea: '主体面积',
    FocalLength: '镜头焦距',
    FlashEnergy: '闪光灯能量',
    SpatialFrequencyResponse: '空间频率响应',
    FocalPlaneXResolution: '焦点平面X的解像度',
    FocalPlaneYResolution: '焦点平面Y的解像度',
    FocalPlaneResolutionUnit: '焦点平面解像度单位',
    SubjectLocation: '主体位置',
    SensingMethod: '感知方法',
    FileSource: '文件来源',
    SceneType: '场景类型',
    CFAPattern: '',
    CustomRendered: '自订影像处理',
    ExposureMode: '曝光模式',
    WhiteBalance: '白平衡',
    DigitalZoomRation: '数码放大比例',
    FocalLengthIn35mmFilm: '35mm胶片等效焦距',
    SceneCaptureType: '',
    GainControl: '',
    Contrast: '对比',
    Saturation: '饱和度',
    Sharpness: '清晰度',
    DeviceSettingDescription: '',
    SubjectDistanceRange: '',
    InteroperabilityIFDPointer: '',
    ImageUniqueID: '',
    ImageWidth: '宽',
    ImageHeight: '高',
    ExifIFDPointer: '',
    GPSInfoIFDPointer: '',
    InteroperabilityIFDPointer: '',
    BitsPerSample: '',
    Compression: '压缩方式',
    PhotometricInterpretation: '',
    Orientation: '图片方向',
    SamplesPerPixel: '',
    PlanarConfiguration: '',
    YCbCrSubSampling: '',
    YCbCrPositioning: '',
    XResolution: '横解像度',
    YResolution: '竖解像度',
    ResolutionUnit: '',
    StripOffsets: '',
    RowsPerStrip: '',
    StripByteCounts: '',
    JPEGInterchangeFormat: '',
    JPEGInterchangeFormatLength: '',
    TransferFunction: '',
    WhitePoint: '',
    PrimaryChromaticities: '',
    YCbCrCoefficients: '',
    ReferenceBlackWhite: '黑白对参照值',
    DateTime: '变更日期',
    ImageDescription: '图名',
    Make: '相机厂商',
    Model: '相机型号',
    Software: '软件',
    Artist: '作者',
    Copyright: '版权'
  };



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
				str += '<p style="line-height:160%; font-size:12px; "><b style="color:#666">' + key + ( (exif_en2cn[key] && exif_en2cn[key] != '') ? '(' + exif_en2cn[key] + ')' : '')  + '</b> : ' + x[key] + '</p>';
			}
			if (str == '') str = '无EXIF信息';
			exifWindow.document.getElementById('loading').innerHTML = '<a href="' + currentImg.src + '">原图链接</a>';
			exifWindow.document.write(str);
		});

	});

});

