var path = require('path');
var rootPath = path.resolve(process.cwd());

var appFileManagerConfig = {};
try{
  
  //require(`${rootPath}/config/file_manager.json`);
}catch(err){}

var mainConfig = Object.assign({
  user_file_path : '/public/user_upload/',
  user_file_abs_path : rootPath+'/public/user_upload/'
}, appFileManagerConfig);

var defaultConfig = {
  Enabled: true,
  UserFilesPath: mainConfig.user_file_path,
  UserFilesAbsolutePath: mainConfig.user_file_abs_path,
  ForceSingleExtension: true,
  SecureImageUploads: true,
  ConfigAllowedCommands: ['QuickUpload', 'FileUpload', 'GetFolders', 'GetFoldersAndFiles', 'CreateFolder'],
  ConfigAllowedTypes: ['File', 'Image', 'Flash', 'Media'],
  HtmlExtensions: ["html", "htm", "xml", "xsd", "txt", "js"],
  ChmodOnUpload: 0777,
  ChmodOnFolderCreate: 0777,
  AllowedExtensions: {
    File: ['7z', 'aiff', 'asf', 'avi', 'bmp', 'csv', 'doc', 'fla', 'flv', 'gif', 'gz', 'gzip', 'jpeg', 'jpg', 'mid', 'mov', 'mp3', 'mp4', 'mpc', 'mpeg', 'mpg', 'ods', 'odt', 'pdf', 'png', 'ppt', 'pxd', 'qt', 'ram', 'rar', 'rm', 'rmi', 'rmvb', 'rtf', 'sdc', 'sitd', 'swf', 'sxc', 'sxw', 'tar', 'tgz', 'tif', 'tiff', 'txt', 'vsd', 'wav', 'wma', 'wmv', 'xls', 'xml', 'zip'],
    Image: ['bmp','gif','jpeg','jpg','png'],
    Flash: ['swf','flv'],
    Media: ['aiff', 'asf', 'avi', 'bmp', 'fla', 'flv', 'gif', 'jpeg', 'jpg', 'mid', 'mov', 'mp3', 'mp4', 'mpc', 'mpeg', 'mpg', 'png', 'qt', 'ram', 'rm', 'rmi', 'rmvb', 'swf', 'tif', 'tiff', 'wav', 'wma', 'wmv']
  },
  DeniedExtensions: {
    File: [],
    Image: [],
    Flash: [],
    Media: []
  },
  FileTypesPath: {
    File: mainConfig.user_file_path + 'file/',
    Image: mainConfig.user_file_path + 'image/',
    Flash: mainConfig.user_file_path + 'flash/',
    Media: mainConfig.user_file_path + 'media/',
  },
  FileTypesAbsolutePath:{
    File: mainConfig.user_file_abs_path == '' ? '' : mainConfig.user_file_abs_path +'file/',
    Image: mainConfig.user_file_abs_path == '' ? '' : mainConfig.user_file_abs_path + 'image/',
    Flash: mainConfig.user_file_abs_path == '' ? '' : mainConfig.user_file_abs_path + 'flash/',
    Media: mainConfig.user_file_abs_path == '' ? '' : mainConfig.user_file_abs_path + 'media/',
  },
  QuickUploadPath: {
    File: mainConfig.user_file_path + 'file/',
    Image: mainConfig.user_file_path + 'image/',
    Flash: mainConfig.user_file_path + 'flash/',
    Media: mainConfig.user_file_path + 'media/',
  },
  QuickUploadAbsolutePath: {
    File: mainConfig.user_file_abs_path,
    Image: mainConfig.user_file_abs_path,
    Flash: mainConfig.user_file_abs_path,
    Media: mainConfig.user_file_abs_path,
  }
}

module.exports = Object.assign({}, defaultConfig, mainConfig);

