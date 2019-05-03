import Mock from 'mockjs'

const menus = {}

const categorysName = []
for (let i = 0; i < 10; i++) {
  categorysName.push(Mock.mock('@word(3, 7)'))
}

// category
categorysName.forEach((name, index) => {
  menus[name] = getMenuInfo(index, '')
})

// module
Object.keys(menus).forEach((menu, index) => {
  const moduleNum = parseInt((Math.random() * 7 + 3), 10)

  for (let i = 0; i < moduleNum; i++) {
    menus[menu].children.push(getMenuInfo(i))

    const sidebarNum = parseInt((Math.random() * 7 + 3), 10)

    for (let j = 0; j < sidebarNum; j++) {
      const isGroup = Math.random() > 0.7
      menus[menu].children[i].children.push(getMenuInfo(j, menus[menu].children[i].route, isGroup))

      if (isGroup) {
        menus[menu].children[i].children[j].route = menus[menu].children[i].children[j].children[0].route
        menus[menu].children[i].children[j].sidebarState = menus[menu].children[i].children[j].children[0].sidebarState
        menus[menu].children[i].children[j].name = menus[menu].children[i].children[j].name + menus[menu].children[i].children[j].linkType + menus[menu].children[i].children[j].sidebarState
      }
    }

    menus[menu].children[i].route = menus[menu].children[i].children[0].route
    menus[menu].children[i].sidebarState = menus[menu].children[i].children[0].sidebarState
    menus[menu].children[i].name = menus[menu].children[i].name + menus[menu].children[i].linkType + menus[menu].children[i].sidebarState
  }
})

function getMenuInfo (index, route, isGroup) {
  const mockRoute = '/' + Mock.mock('@word(3, 7)')

  let currentRoute = null
  if (typeof route === 'string' && !route) {
    currentRoute = route
  } else {
    currentRoute = route ? route + mockRoute : mockRoute
  }

  // const linkType = Mock.mock('@integer(1, 3)')
  const sidebarState = Mock.mock('@integer(1, 3)')
  const menu = {
    linkType: 1,
    sidebarState,
    id: Mock.mock('@integer(10000, 99999)'),
    order: index,
    name: Mock.mock('@ctitle(3, 5)'),
    route: currentRoute,
    children: []
  }

  if (isGroup) {
    const groupNum = parseInt((Math.random() * 7 + 3), 10)
    for (let i = 0; i < groupNum; i++) {
      menu.children.push(getMenuInfo(i, currentRoute))
    }
  }

  return menu
}

export default {
  data: menus
}
