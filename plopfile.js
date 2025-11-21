const vuexGenerator = require('./plop-tmpl/vuex/prompt')
module.exports = function (plop) {
  plop.setGenerator('vuex', vuexGenerator)
}
