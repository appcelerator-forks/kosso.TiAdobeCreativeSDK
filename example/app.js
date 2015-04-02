var win = Ti.UI.createWindow({
	backgroundColor:'white'
});
var mainWindow = Ti.UI.createView({ height: 320, top:0, width: Ti.UI.FILL });
var iv = Titanium.UI.createImageView({ top:0, width: 320});

var tiadobecreativesdk = require('com.kosso.tiadobecreativesdk');
var tools = ['kAFEffects', 'kAFOrientation', 'kAFBrightness', 'kAFContrast', 'kAFSharpness'];
var crops = ["Avatar", 400, 400, "Cover", 960, 260];

function setFilter() {
	Ti.API.log('setFilter() called');
	var img = mainWindow.toImage();
    // specify iOS 7 statusbar light content (see http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.iPhone.StatusBar and http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.iPhone-property-statusBarStyle)
    tiadobecreativesdk.setStatusBarStyle(Ti.UI.iPhone.StatusBar.LIGHT_CONTENT);
    tiadobecreativesdk.newImageEditor({apikey:'yourAviaryAPIkey', secret: 'yourAviarySecret', image: img, tools: tools});
    // or with custom crops:
    // tiadobecreativesdk.newImageEditor({apikey:'yourAviaryAPIkey', secret: 'yourAviarySecret', image: img, tools: tools, crops: crops});
}

function selectPhoto() {

	Titanium.Media.openPhotoGallery({
		success:function(event)
		{
			var image = event.media;//blob object
			// set image view
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{
				iv.image = image;
				mainWindow.add(iv);
			}
		},
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

tiadobecreativesdk.addEventListener('avEditorFinished', function(ev){
  iv.image = ev.image;
});

var startbutton = Ti.UI.createButton({ title: 'Select Photo...', bottom: 10, left: 10 });
var filterbutton = Ti.UI.createButton({ title: 'Filter...', bottom: 10, right: 10 });

win.add(mainWindow);

win.add(startbutton);
win.add(filterbutton);

startbutton.addEventListener('click',function(e) {
   selectPhoto();
});

filterbutton.addEventListener('click',function() {
	setFilter();
});

win.open();


