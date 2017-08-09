import User from './schema/user.js'

/**
 * 插入
 */
function insert () {
    let user = new User({
        userName: 'Tracy McGrady',
        userAddr: 'abcd',
        userAge: 37,
        loginDate: new Date()
    })

    user.save().then(res => {
        console.log('Res:' + res)
    }).catch(err => {
        console.log('Error:' + err)
    })
}

/**
 * 更新
 */
function update () {
    let wherestr = {'userName': 'Tracy McGrady'}
    let updatestr = {'userAddr': 'zzzz'}

    User.update(wherestr, updatestr).then(res => {
        console.log('Res:' + res)
    }).catch(err => {
        console.log('Error:' + err)
    })
}

/**
 * 查找并更新
 */
function findByIdAndUpdate () {
    let id = '59897d9c97a40608350069ff'
    let updatestr = {'userAddr': 'abcd'}

    User.findByIdAndUpdate(id, updatestr).then(res => {
        console.log('Res:' + res)
    }).catch(err => {
        console.log('Error:' + err)
    })
}

/**
 * 删除
 */
function del () {
    let wherestr = {'userName': 'Tracy McGrady'}

    User.remove(wherestr).then(res => {
        console.log('Res:' + res)
    }).catch(err => {
        console.log('Error:' + err)
    })
}

/**
 * 条件查找
 */
function getByConditions () {
    let wherestr = {'userName': 'Tracy McGrady'}

    User.find(wherestr).then(res => {
        console.log('Res:' + res)
    }).catch(err => {
        console.log('Error:' + err)
    })
}

/**
 * 条件查找设置查询出来的字段
 */
function getOptByConditions () {
    let wherestr = {'userName': 'Tracy McGrady'}
    let opt = {'userName': 1, '_id': 0}

    User.find(wherestr, opt).then(res => {
        console.log('Res:' + res)
    }).catch(err => {
        console.log('Error:' + err)
    })
}

/**
 * 数量查询
 */
function getCountByConditions () {
    let wherestr = {}

    User.count(wherestr).then(res => {
        console.log('Res:' + res)
    }).catch(err => {
        console.log('Error:' + err)
    })
}

/**
 * 根据ID查询
 */
function getById () {
    let id = '59897d9c97a40608350069ff'

    User.findById(id).then(res => {
        console.log('Res:' + res)
    }).catch(err => {
        console.log('Error:' + err)
    })
}

/**
 * 模糊查询
 */
function getByRegex () {
    let whereStr = {'userName': {$regex: /m/i}}

    User.find(whereStr).then(res => {
        console.log('Res:' + res)
    }).catch(err => {
        console.log('Error:' + err)
    })
}

/**
 * 分页查询
 */
function getByPager () {
    let pageSize = 5 // 一页多少条
    let currentPage = 1 // 当前第几页
    let sort = {'loginDate': -1} // 排序（按登录时间倒序）
    let condition = {} // 条件
    let skipnum = (currentPage - 1) * pageSize // 跳过数

    User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec().then(res => {
        console.log('Res:' + res)
    }).catch(err => {
        console.log('Error:' + err)
    })
}

export default {
    insert,
    update,
    findByIdAndUpdate,
    del,
    getByConditions,
    getOptByConditions,
    getCountByConditions,
    getById,
    getByRegex,
    getByPager
}
