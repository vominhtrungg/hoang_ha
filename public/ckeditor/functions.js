function initEditor(el){
	CKEDITOR.replace(el,{
		resize_enabled: false,
		language:   "en",
		height : 400,
		width:970,
		//filebrowserBrowseUrl: "/public/ckeditor/plugins/filemanager/browser/default/browser.html?Connector=/browser/browse",
		  //filebrowserUploadUrl: '/uploader/upload?Type=File',
		  //filebrowserImageUploadUrl: '/uploader/upload?Type=Image',
		  //filebrowserFlashUploadUrl: '/uploader/upload?Type=Flash'


	//	filebrowserBrowseUrl : window.location.protocol+'//'+window.location.host+ '/public/ckeditor/plugins/image/dialog/image.js',
      //  filebrowserImageBrowseUrl : window.location.protocol+'//'+window.location.host+ '/public/ckeditor/plugins/image/dialog/image.js',
		
	});
}
function initEditorSmall(el){
	CKEDITOR.replace(el,{
		toolbarGroups:[{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
						{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
						{ name: 'styles' },
						{ name: 'colors' },
						{ name: 'about' }],
		language:   "en",
		height : 200,
		width:970,
		
	});
}