const { notEmpty } = require('../util.js')
module.exports = {
  description: '创建vuex',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '输入store的名称',
      validate: notEmpty('name'),
    },
    {
      type: 'input',
      name: 'props',
      message: '输入store包含的属性，以[,]分割',
      validate: notEmpty('name'),
    },
  ],
  actions(data) {
    const name = '{{name}}'
    const { props } = data
    const setters = []
    //获取属性值大写
    props.split(',').forEach((p) => {
      setters.push({
        name: p,
        mname: p.toUpperCase(),
      })
    })
    const fname = data.name
    const actions = [
      {
        type: 'add',
        path: `src/store/modules/${name}.js`,
        templateFile: 'plop-tmpl/vuex/index.hbs',
        data: {
          setters: setters,
          fname: fname,
        },
      },
    ]
    return actions
  },
}
