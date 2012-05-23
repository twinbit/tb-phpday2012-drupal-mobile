core = 7.x
api = 2

; Regular modules, nothing special here
projects[features][subdir] = "contrib"
projects[ctools][subdir] = "contrib"
projects[admin][subdir] = "contrib"
projects[devel][subdir] = "contrib"
projects[views][subdir] = "contrib"
projects[strongarm][subdir] = "contrib"

projects[geolocation][subdir] = "contrib"
projects[geolocation][version] = 1.0-beta2

projects[libraries][subdir] = "contrib"
projects[libraries][version] = 1.0

projects[flag][subdir] = "contrib"
projects[flag][version] = 2.0-beta6

projects[flag_service][subdir] = "contrib"
projects[flag_service][subdir] = 3.x-dev

projects[services][type] = module
projects[services][subdir] = contrib
projects[services][download][type] = "git"
projects[services][download][url] = "http://git.drupal.org/project/services.git"
projects[services][download][revision] = 8a848e46059ff78312f972ace92c4bf4c8b68fa8
projects[services][download][branch] = master

projects[services_views][subdir] = "contrib"
projects[services_views][version] = 1.x-dev

projects[services_search][type] = module
projects[services_search][subdir] = contrib
projects[services_search][download][type] = "git"
projects[services_search][download][url] = "http://git.drupal.org/project/services_search.git"

; Custom Modules and Features
projects[drupanium_modules][type] = module
projects[drupanium_modules][subdir] = features
projects[drupanium_modules][download][type] = "git"
projects[drupanium_modules][download][url] = "git://github.com/drupanium/drupanium_modules.git"

; Get the spyc library required by the rest server
libraries[spyc][download][type] = "file"
libraries[spyc][download][url] = "http://spyc.googlecode.com/files/spyc-0.5.zip"
libraries[spyc][download][md5] = "4caa361e868e2a61e70e0fc901b6b057"


