import Mock from 'mockjs'
import user from './user'
import examples from './examples'

Mock.setup({
  timeout: '600 - 1000',
})
// 变量
const mocks = [...user, ...examples]

export const init = () => {
  mocks.forEach((m) => {
    Mock.mock(new RegExp(m.url + '.*'), m.type || 'get', m.response)
  })
}
